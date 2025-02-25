<template>
  <main>
    <HomeHeader />
    <form @submit.prevent="sendBadge">
      <div class="inputs">
        <div class="group">
          <CustomInput link-to="firstName" placeholder="first name" type="text" />
          <CustomInput link-to="lastName" placeholder="last name" type="text" />
        </div>
        <div class="group ">
          <div class="el gap-3 nestedGroup w-full flex flex-col">
            <CustomCombobox :default-value="defaultValue" :options="countries" />
            <CustomInput link-to="phoneNumber" placeholder="Phone Number" class="mb-2" type="text" />
            <div class="options">
              <div class="title">
                <h3>Send badge via</h3>
              </div>
              <div class="couple flex justify-between gap-2">
                <CustomCheckbox value="whatsapp" group="sendVia" link-to="sendVia" title="Whatsapp"
                  :error="sendViaError" />
                <CustomCheckbox value="email" group="sendVia" link-to="sendVia" title="E-Mail" :error="sendViaError" />
              </div>
            </div>
          </div>
          <div class="el options-wrapper ">
            <div class="title">
              <h3>Participation Type</h3>
            </div>
            <div class="options flex flex-col gap-4 w-full">
              <div class="couple flex justify-between gap-4">
                <CustomCheckbox value="exhibitor" group="participationType" link-to="participationType"
                  title="exhibitor" :error="pTypeError" />
                <CustomCheckbox value="organizer" group="participationType" link-to="participationType"
                  title="Organizer" :error="pTypeError" />
              </div>
              <div class="couple flex justify-between gap-4">
                <CustomCheckbox value="press" group="participationType" link-to="participationType" title="Press"
                  :error="pTypeError" />
                <CustomCheckbox value="visitor" group="participationType" link-to="participationType"
                  title="Visitor $$(paid)" :error="pTypeError" />
              </div>
            </div>
          </div>
        </div>
        <div class="group">
          <CustomInput link-to="companyName" placeholder="Company Name" type="text" />
          <CustomInput link-to="position" placeholder="Your Position" type="text" />
        </div>
        <div class="group">
          <CustomInput link-to="email" placeholder="Your Email" type="email" />
        </div>
        <HomeImageInput />
      </div>
      <div class="submit mt-4">
        <button :class="['register py-2 px-4 rounded-sm', canSubmit ? '' : 'cantSubmit']"
          v-html="registerButtonContent"></button>
        <span class="clear cursor-pointer p-3 select-none" @click="clearData">Clear all</span>
      </div>
    </form>
  </main>
</template>

<script setup>
import { useShadcnHelpers } from '#imports'


const inputsStore = useMyInputsStore()
const defaultValue = ref([])
const countries = ref([])
const countriesStore = useMyCountriesStore()
const sendViaError = ref(false)
const pTypeError = ref(false)
const registerButtonContent = ref("Register Badge")
const canSubmit = ref(true)
const homeStore = useMyHomeStore()
const router = useRouter()
const { runErrorToast } = useShadcnHelpers()


onMounted(async () => {
  await countriesStore.getDefaultCountry()
  defaultValue.value = {
    flag: countriesStore.defaultCountry.flags.png,
    name: countriesStore.defaultCountry.name.common
  }
  await countriesStore.getCountries()
  countries.value = countriesStore.countries.map(({ name, flags }) => {
    const transformedCountry = {
      label: name.common.toLowerCase(),
      value: name.common,
      flag: flags.png,
    }
    return transformedCountry
  })
})

const isValidPhoneNumber = (phoneNumber) => {
  const internationalRegex = /^\+?[1-9]\d{1,14}$/;

  const localRegex = /^(\d{7,15})$/;

  return internationalRegex.test(phoneNumber) || localRegex.test(phoneNumber);
}

const sendBadge = async () => {

  const inputs = ["firstName", "lastName", "country", "position", "companyName", "phoneNumber", "email"]
  const canSend = ref(true)
  const firstName = inputsStore.firstName.value;
  const lastName = inputsStore.lastName.value;
  const companyName = inputsStore.companyName.value;
  const email = inputsStore.email.value;
  const phoneNumber = inputsStore.phoneNumber.value;
  const position = inputsStore.position.value

  inputs.forEach((input) => {
    if (inputsStore[input].value == '') {
      canSend.value = false
      inputsStore[input].error = true
    } else {
      canSend.value = true
      inputsStore[input].error = false
    }
  })

  if (inputsStore.participationType == "") {
    canSend.value = false
    pTypeError.value = true
  } else {
    canSend.value = true
    pTypeError.value = false
  }
  if (inputsStore.sendVia == "") {
    canSend.value = false
    sendViaError.value = true
  } else {
    canSend.value = true
    sendViaError.value = false
  }
  if (inputsStore.image.value == "") {
    canSend.value = false
    inputsStore.image.error = true
  } else {
    canSend.value = true
    inputsStore.image.error = false
  }
  if (!canSend.value) {
    return;
  }

  if (isValidPhoneNumber(phoneNumber)) {
    runErrorToast({
      title: "Phone number validate error.",
      message: "Phone number is not valid."
    })
    inputsStore.phoneNumber.error = true
    return;
  } else {
    inputsStore.phoneNumber.error = false
  }

  const formData = new FormData()
  formData.append("first_name", firstName)
  formData.append("last_name", lastName)
  formData.append("phone_number", phoneNumber)
  formData.append("email", email)
  formData.append("company_name", companyName)
  formData.append("country", countriesStore.currentCountry.name.common)
  formData.append("position", position)
  formData.append("participation_type", inputsStore.participationType)
  formData.append("send_via", inputsStore.sendVia)
  formData.append("image", inputsStore.image.value)
  try {
    canSubmit.value = false
    registerButtonContent.value = "Registering..."
    const response = await $fetch(`${homeStore.baseUrl}/api/user/register`, {
      method: "POST",
      body: formData,
    })
    homeStore.user = response.user
    registerButtonContent.value = "Badge Registered"
    clearData()
    setTimeout(() => {
      router.push("/success")
    }, 200);
  } catch (error) {
    registerButtonContent.value = "Register Badge"
    runErrorToast({
      title: "Something went wrong.",
      message: error.statusMessage
    })
    console.error(error.statusMessage)
  } finally {
    canSubmit.value = true
  }
}

const clearData = () => {
  const inputs = ["firstName", "lastName", "country", "position", "companyName", "phoneNumber", "email"]
  inputs.forEach((input) => {
    inputsStore[input].value = ""
  })
  inputsStore.image.value = ''
}
</script>

<style scoped lang="scss">
.inputs {
  width: 80%;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .group {
    display: flex;
    justify-content: space-between;
    gap: .5rem;

    .el {
      width: 45%;

      @media (max-width: 767px) {
        width: 100%;
      }

      input {
        width: 100%;
      }
    }

    @media (max-width: 1080px) {
      flex-direction: column;
      justify-content: start;

      input {
        width: 100% !important;
      }
    }

    input {
      width: 45%;
    }
  }

  .options-wrapper,
  .options {
    flex: .7;
    color: rgba(0, 0, 0, 0.692);
    user-select: none;

    .title {
      margin-bottom: .6rem;
    }

    .couple {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}

.submit {
  display: flex;
  align-items: center;
  gap: 1rem;

  .register {
    background-color: rgba(0, 68, 255, 0.884);
    color: rgb(255, 255, 255);
    border-radius: 100px;
    width: 200px;
    transition: .2s;

    &.cantSubmit {
      opacity: .5;
    }
  }

  .clear {
    text-decoration: underline;
  }
}
</style>