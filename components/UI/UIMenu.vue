<script setup lang="ts">
const menuGroups = ref([
  {
    id: 1,
    title: 'Аналитика',
    items: [
      { id: 1, name: '', title: 'Дашборд', icon: 'dashboard' },
      { id: 2, name: 'reports', title: 'Отчеты', icon: 'file' }
    ]
  },

  {
    id: 2,
    title: 'Основное',
    items: [
      { id: 1, name: 'device', title: 'Устройства', icon: 'printer' },
      { id: 2, name: 'users', title: 'Пользователи', icon: 'user' },
      { id: 3, name: 'tasks', title: 'Задания', icon: 'tasks' },
      { id: 4, name: 'events', title: 'События', icon: 'list' },
      { id: 5, name: 'repository', title: 'Склад', icon: 'market' }
    ]
  },

  {
    id: 3,
    title: 'Настройки',
    items: [
      { id: 1, name: 'settings', title: 'Общие настройки', icon: 'settings' },
      { id: 2, name: 'monitor', title: 'Мониторинг', icon: 'monitor' },
      { id: 3, name: 'integrate', title: 'Интеграция', icon: 'integrate' }
    ]
  }
])
</script>

<template>
  <div class="menu">
    <div>
      <div v-for="group in menuGroups.slice(0, 2)" :key="`group_id_#_${group.id}`" class="menu-group">
        <div class="menu-group__title">
          {{ group.title }}
        </div>

        <div class="menu-group__items">
          <nuxt-link
              v-for="item in group.items"
              :key="`item_id_#_${item.id}`"
              :to="`/${item.name}`"
          >
            <div
                class="menu-group__item"
                :class="{ active: item.name === $route.name || 'index' === $route.name && !item.name }"
            >
              <img
                  :src="`_nuxt/assets/icons/menu/${item.name === $route.name || 'index' === $route.name && !item.name ? 'active/' : ''}${item.icon}-icon.svg`"
                  :alt="item.name"
              />
              {{ item.title }}
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>

    <div class="menu-group">
      <div class="menu-group__title">
        {{ menuGroups[2].title }}
      </div>

      <div class="menu-group__items">
        <nuxt-link
            v-for="item in menuGroups[2].items"
            :key="`item_id_#_${item.id}`"
            :to="`/${item.name}`"
        >
          <div
              class="menu-group__item"
              :class="{ active: item.name === $route.name || 'index' === $route.name && !item.name }"
              @click=""
          >
            <img
                :src="`_nuxt/assets/icons/menu/${item.name === $route.name || 'index' === $route.name && !item.name ? 'active/' : ''}${item.icon}-icon.svg`"
                :alt="item.name"
                width="24"
            />
            {{ item.title }}
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu {
  background: #11151C;
  padding: 16px 8px;
  border-radius: 10px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &-group {
    padding: 8px 0;
    margin-bottom: 16px;
    &__title {
      margin-bottom: 20px;
      color: var(--Text-Light, #8E94A0);
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 20px; /* 142.857% */
      letter-spacing: 1px;
      text-transform: uppercase;

      padding: 0 12px;
    }

    &__items {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    &__item {
      cursor: pointer;
      color: #FFF;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 125% */
      display: flex;
      align-items: center;
      gap: 12px;

      padding: 0 12px;

      &.active {
        cursor: default;
        border-radius: 8px;
        background: var(--Main-Blue-Medium, #89ADF2);
        padding: 12px;
      }
    }
  }
}
</style>
