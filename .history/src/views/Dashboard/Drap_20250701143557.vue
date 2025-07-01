<script>
import { defineComponent, ref } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
export default defineComponent({
  name: 'Drap',
  components: {
    VueDraggable,
  },
  setup() {
    const list1 = ref([
      {
        name: 'Joao',
        id: 1,
        checked: false,
      },
      {
        name: 'Jean',
        id: 2,
        checked: true,
      },
      {
        name: 'Johanna',
        id: 3,
        checked: false,
      },
      {
        name: 'Juan',
        id: 4,
        checked: false,
      },
    ]);

    const list2 = ref([
      {
        name: 'Joao',
        id: 1,
      },
      {
        name: 'Jeadddn',
        id: 21,
      },
      {
        name: 'Johansssana',
        id: 31,
      },
      {
        name: 'Juasdasdan',
        id: 41,
      },
    ]);

    const list3 = ref([
      {
        name: 'Joao',
        id: 1,
      },
      {
        name: 'Jeadddn',
        id: 21,
      },
      {
        name: 'Johansssana',
        id: 31,
      },
      {
        name: 'Juasdasdan',
        id: 41,
      },
    ]);

    return { list1, list2, list3 };
  },
});
</script>
<template>
  <div class="app">
    <VueDraggable
      v-model="list1"
      animation="150"
      ghostClass="ghost"
      class="container"
      filter=".Joao"
      group="person"
    >
      <div v-for="item in list1" :key="item.id" :class="item.name" class="item">
        {{ item.name }}
        <input type="checkbox" v-model="item.checked" />
      </div>
    </VueDraggable>

    <VueDraggable
      v-model="list2"
      animation="150"
      group="person"
      ghostClass="ghost"
      class="container"
      filter=".ignore"
    >
      <div v-for="item in list2" :key="item.id" class="item">
        {{ item.name }}
      </div>
    </VueDraggable>
    <VueDraggable
      v-model="list3"
      animation="150"
      group="person"
      ghostClass="ghost"
      class="container"
      filter=".ignore"
    >
      <div v-for="item in list3" :key="item.id" class="item">
        {{ item.name }}
      </div>
    </VueDraggable>
        <VueDraggable
      v-model="list4"
      animation="150"
      ghostClass="ghost"
      class="container"
      filter=".Joao"
      group="person"
    >
      <div v-for="item in list4" :key="item.id" :class="item.name" class="item">
        {{ item.name }}
        <input type="checkbox" v-model="item.checked" />
      </div>
    </VueDraggable>
        <VueDraggable
      v-model="list5"
      animation="150"
      ghostClass="ghost"
      class="container"
      filter=".Joao"
      group="person"
    >
      <div v-for="item in list5" :key="item.id" :class="item.name" class="item">
        {{ item.name }}
        <input type="checkbox" v-model="item.checked" />
      </div>
    </VueDraggable>
        <VueDraggable
      v-model="list6"
      animation="150"
      ghostClass="ghost"
      class="container"
      filter=".Joao"
      group="person"
    >
      <div v-for="item in list6" :key="item.id" :class="item.name" class="item">
        {{ item.name }}
        <input type="checkbox" v-model="item.checked" />
      </div>
    </VueDraggable>
  </div>
</template>

<style>
.container {
  display: grid;
  gap: 10px;
}
.item {
  width: 100%;
  background-color: rgb(101, 184, 240);
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: move;
}
.app {
  display: flex;
  gap: 10px;
}
</style>