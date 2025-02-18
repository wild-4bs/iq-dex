<template>
  <div class="image flex gap-4">
    <label for="imageInput" :style="{ pointerEvents: inputsStore.image.value ? 'none' : '' }" ref="dropArea"
      class="imageInput" @drop.prevent="handleDrop" @dragleave="dragOver = false" @dragover="dragOver = true"
      @drop="handleDrop"
      :class="['input  text-gray-500 flex flex-col w-[210px] relative overflow-hidden rounded-lg border-2 cursor-pointer items-center justify-between text-center border-dotted p-4 border-gray-300', dragOver ? 'dragging' : '', inputsStore.image.error ? 'error' : '']">
      <input type="file" @change="handleFileChange($event.target.files)" class="hidden" id="imageInput"
        ref="imageInput">
      <div v-show="inputsStore.image.value" class="viewer top-0 left-0 w-full h-full"
        style="z-index: 10; position: absolute;">
        <img src="" ref="actualImage" class="w-full h-full object-cover" alt="">
      </div>
      <div class="icon pointer-events-none flex flex-col  gap-2 items-center justify-between text-center">
        <div class="icon text-5xl">
          <Icon name="ic:outline-file-upload" />
        </div>
        <span class="font-medium text-sm">{{ imageInputContent }}</span>
      </div>
      <span class="mb-2 text-center">-OR-</span>
      <span class="py-2 px-4 bg-slate-900 rounded-lg text-gray-200 text-sm" @click="imageInput.click()">Brows
        files</span>
    </label>
    <div class="eg h-full flex gap-4">
      <img src="/home/example.png" class="h-full w-[150px]" alt="eg">
      <div class="imageRequirements">
        <h2 class="font-medium mb-4 text-gray-500 text-sm">Conditions for uploading an image:</h2>
        <ul class="text-sm  text-gray-500">
          <li class="flex items-center gap-2" v-for="requirement in imageRequirements" :key="requirement.content">
            <span class="circle w-[5px] h-[5px] rounded-full bg-gray-500"></span>
            <span>{{ requirement.content }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const inputsStore = useMyInputsStore()

const imageRequirements = ref([
  {
    content: "High lighting"
  },
  {
    content: "High Quality"
  },
  {
    content: "Image with white background"
  },
  {
    content: "A photo of the person provided exclusively"
  },
  {
    content: "File Type: JPG, PNG"
  },
  {
    content: "File Size: 3MB - 5MB"
  },
])

const dropArea = ref('')
const dragOver = ref(false)
const imageInput = ref(null)
const actualImage = ref(null)
const imageInputContent = ref("Drag and drop files here")


const handleFileChange = (files) => {
  const file = files[0];

  const allowedTypes = ['image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
    imageInputContent.value = "Image type is not supported yet"
    return;
  }
  const maxSize = 5 * 1024 ** 2; // 5MB
  if (file.size > maxSize) {
    imageInputContent.value = "Image size is not supported yet"
    return;
  }
  imageInputContent.value = "Drag and drop files here"
  inputsStore.image.value = file
  const reader = new FileReader();
  reader.onload = function (e) {
    actualImage.value.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const preventDefaults = (e) => {
  e.preventDefault();
  e.stopPropagation();
}
const handleDrop = (e) => {
  const dt = e.dataTransfer;
  const files = dt.files;

  if (files.length > 0) {
    imageInput.value.files = files;
    handleFileChange(files);
  }
}

onMounted(() => {
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.value.addEventListener(eventName, (e) => { preventDefaults(e) }, false);
  });
})
</script>

<style scoped lang="scss">
.image {
  @media (max-width: 767px) {
    flex-direction: column;
  }

  .imageInput {
    @media (max-width: 767px) {
      width: 100%;
    }

    &.dragging {
      border-color: rgb(0, 140, 255);
    }

    &.error {
      border-color: rgb(230, 42, 42);
    }
  }

  .eg {
    @media (max-width: 1080px) {
      flex-direction: column;

      img {
        width: 200px;
        margin: auto;
      }

      .imageRequirements {
        width: 100%;
      }
    }
  }
}
</style>