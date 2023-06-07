<script setup>
import { ref, computed, onMounted } from "vue";
defineProps(
    {
        order: {
            type: Object,
            required: true
        }
    }
)

const pathToImg = ref("./img/")

</script>

<template>
    <div class="order-wrapper">

        <section class="order-summary">
            <h3>Numéro de ticket : {{ order.summary.id }}</h3>
            <p>Date d'achat : {{ order.summary.date }}</p>
            <p>Nombre d'article : {{ order.summary.total_quantity }}</p>
            <p>coût total : {{ order.summary.total_cost }} crédits</p>
        </section>
        <section class="order-content">
            <table>
                <caption>contenu</caption>
                <thead>
                    <tr>
                        <th>article</th>
                        <th>quantité</th>
                        <th>coût unitaire</th>
                        <th>sous total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="article in order['content']">
                        <td>{{ article.name }}</td>
                        <td>{{ article.quantity }}</td>
                        <td>{{ article.unit_cost }}</td>
                        <td>{{ article.cost }}</td>
                    </tr>
                </tbody>
            </table>
        </section>

    </div>
</template>

<style lang="scss" scoped>
@use "../src/scss/abstract/" as *;
@use "../src/scss/elements/" as *;

.order-wrapper {
    padding: 10px;
    background-color: $background-primary;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.order-summary {
    display: flex;
    flex-direction: column;
    gap: 5px;

    h3 {
        font-weight: bold;
    }
}

.order-content {
    width: 100%;


    table {
        width: 100%;
        text-align: center;
    }

    caption {
        font-size: $font_medium;
        font-weight: bold;
        margin-bottom: 5px;
    }

    thead {
        font-size: $font_small;
    }

    tbody {
        font-size: $font_small;

        tr {
            border-bottom: 1px solid;
        }
    }
}
</style>