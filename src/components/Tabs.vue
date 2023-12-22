<script setup>
import { ref, watch } from 'vue';

const props = defineProps(["tabs"])

// const tabs = [
//     { label: 'Developer', content: 'Content for Tab 1 with <strong>HTML</strong>' },
//     { label: 'ReciPen App', content: 'Content for Tab 2 with <em>emphasis</em>' },
//     { label: 'Tab 3', content: 'Content for Tab 3 with <a href="#">a link</a>' },
// ];
const tabs = props.tabs;

const activeTab = ref(0);
const tabContent = ref(tabs[0].content);
const selectTab = (index) => {
    activeTab.value = index;
};
watch(activeTab, () => {
    tabs.forEach((tab, index) => {
        if (index === activeTab.value) {
            tabContent.value = tab.content
        }
    })
})
</script>

<template>
    <section class="container">
        <div class="tab-container">
            <div v-for="(tab, index) in tabs" :key="index" @click="selectTab(index)"
                :class="{ 'active-tab': activeTab === index }" class="tab">
                {{ tab.label }}
            </div>
        </div>

        <div class="tab-content">
            <div v-html="tabContent" class="content"></div>
        </div>
    </section>
</template>
  
  
<style>
.tab-container {
    display: flex;
    margin-top: 2rem;
}

.tab {
    cursor: pointer;
    color: #999;
    font-size: 1.125rem;
    font-weight: 700;
    padding: 18px 30px;
    border: 1px solid var(--border-color);
    border-bottom: none;
    border-radius: 5px 5px 0px 0px;
    border-right: none;
}

.tab:last-of-type {
    border-right: 1px solid var(--border-color);
}

.active-tab {
    color: var(--primary);
    position: relative;
    border-bottom: none;
    background-color: #fff;
}

.active-tab::before {
    content: "";
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    height: 0.3125rem;
    background-color: var(--primary);
    border-radius: 5px 5px 0px 0px;
}

.tab-content {
    margin-top: -1px;
    border: 1px solid var(--border-color);
    padding: 1.25rem;
    border-radius: 0px 5px 5px 5px;
}

/* Content Related */
.tab-content .content {
    line-height: 1.85rem;
    margin-top: 2rem;
}

.tab-content .content .sub-heading {
    margin-bottom: 1rem;
}

.tab-content .content .sub-heading+p {
    margin-bottom: 2rem;
}


.tab-content .content a {
    color: var(--primary);
    font-weight: bold;
    text-decoration: none;
}

.tab-content .content a:hover {
    color: var(--accent);
}

.inverse {
    background: var(--green-lightest);
    color: var(--dark-grey);
    clip-path: inset(0 -100vw);
    box-shadow: 0 0 0 25px var(--green-lightest);
    padding-block: 1rem;
}
</style>
  