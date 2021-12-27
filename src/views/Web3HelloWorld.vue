<template>
  <div class="about">
    <h1>Hello World from contract ETH in localhost</h1>
    <h2>Current message is : {{ message }}</h2>
    <div>
      <input
        v-model="newMessage"
        type="text"
        placeholder="Update message value"
      />
      <button @click="updateMessage()">Update message</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { getMessage, updateMessage } from "@/modules/ContractHelloWorld";

@Options({
  props: {
    msg: String,
  },
  data() {
    return {
      message: "?",
      newMessage: "",
    };
  },
  async created() {
    await this.getMessage();
  },
  methods: {
    async getMessage() {
      this.message = await getMessage();
    },
    async updateMessage() {
      const result = await updateMessage(this.newMessage);
      await this.getMessage();
    },
  },
})
export default class Web3HelloWorld extends Vue {
  msg!: string;
}
</script>
