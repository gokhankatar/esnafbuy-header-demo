<script lang="ts" setup>
import store from "~/store/store";
import { ref, onMounted } from "vue";

const _store = store();
const router = useRouter();
const isLoading = ref(true);
const isOpenTopBar = ref(true);
const isOpenSearchBar = ref(false);
const isOpenCategoriesBar = ref(false);
const isOpenDrawer = ref(false);

const activeImgUrl = ref(
  "https://res.cloudinary.com/dtjmxdtvw/image/upload/v1706430798/wvobn8w3dorenxoqgsns.webp"
);
const secondList = ref([]);
const thirdList = ref([]);

const activeForMobileCategoriesList = ref([]);

const models = ref({
  name: "",
});

const run = (item: any) => {
  console.log(item);
};

const { data } = await useFetch("https://api.esnafbuy.com/v1.0/overviewSubcategories");

const fetchDataForMobile = () => {
  activeForMobileCategoriesList.value = data.value?.overviewSubCategories;
};

const returnMobileImg = (item: any) => {
  if (item.categoryImage) {
    return item.categoryImage;
  } else if (item.subCategoryImage) {
    return item.subCategoryImage;
  } else if (item.subCategoryItemImage) {
    return item.subCategoryItemImage;
  }
};

const returnMobileTitle = (item: any) => {
  if (item.categoryTitle) {
    return item.categoryTitle;
  } else if (item.subCategoryTitle) {
    return item.subCategoryTitle;
  } else if (item.subCategoryItemTitle) {
    return item.subCategoryItemTitle;
  }
};

const setSecondList = (item: any) => {
  activeImgUrl.value = item.categoryImage;

  if (item.data) {
    secondList.value = item.data;
  } else {
    secondList.value = [];
  }
};

const setSecondMobileList = (item: any) => {
  if (item.data) {
    activeForMobileCategoriesList.value = item.data;
  }
};

const setThirdMobileList = (item: any) => {
  if (item.data) {
    activeForMobileCategoriesList.value = item.data;
  }
};

const setThirdList = (item: any) => {
  activeImgUrl.value = item.subCategoryImage;

  if (item.data) {
    thirdList.value = item.data;
  } else {
    thirdList.value = [];
  }
};

const setFourthItem = (item: any) => {
  activeImgUrl.value = item.subCategoryItemImage;
};

const openSearchBar = async () => {
  isOpenSearchBar.value = true;
  models.value.name = "";
  await nextTick();

  const searchBar = document.getElementById("searchBar");
  searchBar?.focus();
};

const handleKeyDown = (e: any) => {
  if (e.ctrlKey && e.key === "k") {
    e.preventDefault();
    openSearchBar();
  }
};

onMounted(() => {
  isLoading.value = false;
  window.addEventListener("keydown", handleKeyDown);
  fetchDataForMobile();
});
</script>

<template>
  <Loading v-if="isLoading" />

  <!-- top bar -->
  <div
    v-if="isOpenTopBar && !isLoading"
    class="top-bar d-none d-sm-flex justify-center align-center py-1"
  >
    <p class="text-white">
      Welcome to the biggest wholesale marketplace in Turkey! Dive into endless
      oppurtunities.
    </p>
    <v-icon
      @click="isOpenTopBar = false"
      class="icon-close transition cursor-pointer rounded-lg"
      icon="mdi-close"
      color="white"
    />
  </div>

  <!-- navbar -->
  <div
    v-if="!isLoading"
    :class="_store.theme === 'light' ? 'header-light' : 'header-dark'"
    class="header d-flex justify-space-between align-center py-3 px-2 rounded-lg"
  >
    <img
      @click="router.replace('/')"
      src="https://esnafbuy.com/resources/images/logo_no_safe_area_v2.svg"
      class="d-none d-sm-flex logo cursor-pointer"
      width="150"
    />
    <img
      @click="router.replace('/')"
      src="https://esnafbuy.com/resources/images/logo_no_safe_area_v2.svg"
      class="d-flex d-sm-none logo cursor-pointer"
      width="100"
    />

    <div class="categories-search d-none d-sm-flex align-center justify-center ga-3">
      <v-btn
        @click="openSearchBar"
        :class="_store.theme === 'light' ? 'search-btn-light' : 'search-btn-dark'"
        class="rounded-xl transition bg-transparent px-md-8 px-lg-10 px-xl-15"
        text="search products... &nbsp; &nbsp; ctrl+k"
        append-icon="mdi-magnify"
        elevation="0"
      />
    </div>

    <div class="actions d-flex justify-center align-center ga-2">
      <v-icon class="icon transition cursor-pointer pa-5 rounded-lg" icon="mdi-account" />
      <v-icon class="icon transition cursor-pointer pa-5 rounded-lg" icon="mdi-basket" />
      <v-icon
        class="icon transition cursor-pointer pa-5 rounded-lg"
        @click="_store.changeTheme"
        :icon="_store.theme === 'light' ? 'mdi-weather-night' : 'mdi-white-balance-sunny'"
      />
      <v-btn
        @click="isOpenCategoriesBar = !isOpenCategoriesBar"
        variant="text"
        class="icon d-none d-sm-flex transition"
        text="categories"
        :prepend-icon="isOpenCategoriesBar ? 'mdi-close' : 'mdi-menu'"
      />
      <v-icon
        @click="isOpenDrawer = !isOpenDrawer"
        class="icon d-flex d-sm-none transition cursor-pointer pa-5 rounded-lg"
        :icon="isOpenDrawer ? 'mdi-close' : 'mdi-shape'"
      />
    </div>
  </div>

  <!-- search-bar if(mobileView) -->
  <div v-if="!isLoading" class="search-bar-wrapper my-5">
    <v-text-field
      class="d-block d-sm-none"
      v-model="models.name"
      label="Search"
      :color="_store.theme === 'light' ? '#20334e' : '#4ABCE6'"
      placeholder="What are you looking for?"
      variant="outlined"
      rounded="xl"
      clearable
    />
  </div>

  <!-- categories bar -->
  <div
    v-if="isOpenCategoriesBar"
    :class="_store.theme === 'light' ? 'categories-bar-light' : 'categories-bar-dark'"
    class="categories-bar my-3 rounded-lg pa-2 rounded-lg"
  >
    <v-row class="d-flex justify-center align-center">
      <v-col cols="12">
        <v-img
          class="rounded-lg d-none d-md-flex"
          cover
          :src="activeImgUrl"
          height="400"
        />
        <v-img
          class="rounded-lg d-none d-sm-flex d-md-none"
          cover
          :src="activeImgUrl"
          height="400"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-list class="d-flex flex-column rounded-lg">
          <v-list-item
            @click="setSecondList(item)"
            @mouseover="setSecondList(item)"
            :class="_store.theme === 'light' ? 'link-light' : 'link-dark'"
            class="link cursor-pointer transition rounded-lg"
            v-for="item of data?.overviewSubCategories"
            :key="item.categoryId"
            append-icon="mdi-arrow-right"
          >
            {{ item.categoryTitle }}
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-list v-if="secondList.length > 0" class="d-flex flex-column rounded-lg">
          <v-list-item
            @click="setThirdList(item)"
            @mouseover="setThirdList(item)"
            :class="_store.theme === 'light' ? 'link-light' : 'link-dark'"
            class="link cursor-pointer transition rounded-lg"
            v-for="item of secondList"
            :key="item"
            append-icon="mdi-arrow-right"
            :title="item.subCategoryTitle"
          />
        </v-list>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-list v-if="thirdList.length > 0" class="d-flex flex-column rounded-lg">
          <v-list-item
            @mouseover="setFourthItem(item)"
            :class="_store.theme === 'light' ? 'link-light' : 'link-dark'"
            class="link cursor-pointer transition rounded-lg"
            v-for="item of thirdList"
            :key="item"
            append-icon="mdi-arrow-right"
            :title="item.subCategoryItemTitle"
          />
        </v-list>
      </v-col>
    </v-row>
  </div>

  <!-- categories bar if(mobileView) -->
  <v-navigation-drawer
    v-if="!isLoading"
    class="pa-5 d-flex d-sm-none rounded-lg"
    :class="_store.theme === 'light' ? 'nav-drawer-light' : 'nav-drawer-dark'"
    v-model="isOpenDrawer"
    location="left"
    temporary
  >
    <v-row class="my-5 px-5">
      <img
        @click="router.replace('/')"
        src="https://esnafbuy.com/resources/images/logo_no_safe_area_v2.svg"
        class="logo cursor-pointer"
        width="100%"
      />
    </v-row>
    <v-row class="mt-3 px-5 d-flex justify-space-between align-center">
      <v-btn
        @click="fetchDataForMobile"
        color="warning"
        variant="tonal"
        size="small"
        prepend-icon="mdi-arrow-left"
        text="back"
      ></v-btn>
      <v-btn
        color="error"
        variant="tonal"
        size="small"
        append-icon="mdi-arrow-right"
        text="exit"
        @click="isOpenDrawer = false"
      />
    </v-row>
    <hr class="my-5" />
    <v-list class="d-flex flex-column ga-2">
      <v-list-item
        @click="setSecondMobileList(item)"
        class="mobile-category-list d-flex flex-row justify-space-between align-center cursor-pointer"
        v-for="item of activeForMobileCategoriesList"
      >
        <div class="d-flex align-center ga-1">
          <v-img class="rounded-lg" :src="returnMobileImg(item)" width="50" />
          <span class="text-subtitle-2">{{ returnMobileTitle(item) }}</span>
        </div>
        <v-icon class="mobile-right-icon" size="small" icon="mdi-arrow-right" />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <!-- search bar -->
  <v-dialog v-model="isOpenSearchBar" max-width="600">
    <div class="wrapper pa-5 pa-sm-10 rounded-lg">
      <v-text-field
        id="searchBar"
        class="text-white"
        v-model="models.name"
        label="Search"
        color="white"
        placeholder="What are you looking for?"
        variant="outlined"
        rounded="xl"
        clearable
      />
    </div>
  </v-dialog>
</template>

<style scoped>
@import url(/assets/css/main.css);
.img {
  height: 20rem;
}
.wrapper {
  position: relative;
  background: #20334e;
  max-height: 70vh;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: #20334e #f1f1f1;
  scroll-behavior: smooth;
}
.nav-drawer-light {
  border-right: 2px solid #1a2537;
}
.nav-drawer-dark {
  border-right: 2px solid #4abce6;
}
.mobile-category-list {
  position: relative;
}
.mobile-right-icon {
  position: absolute;
  right: 0%;
  top: 50%;
}
.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #1a2537;
}
.icon-close {
  position: absolute;
  right: 1%;
}
.icon-close:hover {
  background-color: red;
  color: #fff;
}
.search-btn-light {
  border: 1px solid #1a2537;
  color: #1a2537 !important;
  background-color: transparent;
}
.search-btn-light:hover {
  background-color: #1a2537 !important;
  color: #fff !important;
}
.search-btn-dark {
  border: 1px solid #4abce6;
  color: #4abce6 !important;
  background-color: transparent;
}
.search-btn-dark:hover {
  background-color: #4abce6 !important;
  color: #fff !important;
}
.link-light:hover {
  background-color: #1a2537 !important;
  color: #fff !important;
}
.link-dark:hover {
  background-color: #4abce6 !important;
  color: #fff !important;
}
.categories-bar-light {
  background: rgba(0, 0, 0, 0.1);
}
.categories-bar-dark {
  background: rgba(255, 255, 255, 0.1);
}
.header-dark {
  background: rgba(255, 255, 255, 0.1);
}
.header-light {
  background: rgba(0, 0, 0, 0.1);
}
.icon:hover {
  background-color: rgba(0, 0, 0, 0.3) !important;
}
</style>
