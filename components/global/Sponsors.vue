<template>
    <div class="sponsors">
        <div class="wrapper grid grid-cols-2 gap-6">
            <div class="sponsor" v-for="(category, i) in logoCategories" :key="i">
                <div class="title mb-3">
                    <h3 class="capitalize font-medium">{{ category.category }}</h3>
                </div>
                <div class="logos grid gap-4 grid-cols-2">
                    <div class="logo" v-for="(logo, i) in category.logos" :key="i">
                        <img :src="logo" alt="" style="width: 50px;">
                    </div>
                </div>
            </div>
        </div>
        <div class="contacts mt-4">
            <div class="phone flex items-center gap-2">
                <div class="icon">
                    <Icon name="ic:outline-phone" class="text-gray-500 text-2xl" />
                </div>
                <div class="value text-sm text-gray-200">
                    <span>+964 7806 666 661 - +964 7702 444 844</span>
                </div>
            </div>
            <div class="phone flex items-center gap-2">
                <div class="icon">
                    <Icon name="ic:twotone-mail-outline" class="text-gray-500 text-2xl" />
                </div>
                <div class="value text-sm text-gray-200">
                    <span>info@unitedevents.iq - ATSO@unitedevents.iq</span>
                </div>
            </div>
        </div>
        <div class="social flex items-center gap-3 mt-2">
            <div class="icon">
                <img src="/public/icons/facebook.png" alt="">
            </div>
            <div class="icon">
                <img src="/public/icons/instagram.png" alt="">
            </div>
            <div class="icon">
                <img src="/public/icons/linkedin.png" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>

const logoCategories = [
    {
        category: "sponsored by",
        logos: ["/home/logos/sponsors/1.png"]
    },
    {
        category: "in association with",
        logos: ["/home/logos/association/1.png", "/home/logos/Association/2.png", "/home/logos/Association/3.png", "/home/logos/Association/4.png"],
    },
    {
        category: "association",
        logos: ["/home/logos/Association/1.png", "/home/logos/Association/2.png", "/home/logos/Association/3.png", "/home/logos/Association/4.png"],
    },
    {
        category: "host venue",
        logos: ["/home/logos/Host/1.png"],
    },
    {
        category: "Organized by",
        logos: ["/home/logos/Organized/1.png"],
    },
    {
        category: "ISO certificate",
        logos: ["/home/logos/Certificate/1.png", "/home/logos/Certificate/2.png"],
    },
    {
        category: "Member of",
        logos: ["/home/logos/Member/1.png", "/home/logos/Member/2.png", "/home/logos/Member/3.png", "/home/logos/Member/4.png"],
    },
]

</script>

<style scoped lang="scss">
.sponsors {
    padding: 20px;
    border-radius: 10px;
    background-color: rgba(49, 49, 49, 0.87);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    color: white;

    @media (max-width: 1080px) {
        width: 100%;
        height: unset;
    }
}
</style>