import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
// import HelloWorld from "@/components/HelloWorld.vue";
import MachineShow from "../../src/views/MachineShow.vue";

// describe("HelloWorld.vue", () => {
//   it("renders props.msg when passed", () => {
//     const msg = "new message";
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     });
//     expect(wrapper.text()).to.include(msg);
//   });
// });

describe("MachineShow.vue", () => {
  it("renders h1 tag", () => {
    const wrapper = shallowMount(MachineShow);
    expect(wrapper.find("h1").text()).equal("Hi There");
  });

  it("renders props.id when passed", () => {
    const id = 2;
    const wrapper = shallowMount(MachineShow, {
      propsData: { id }
    });
    expect(wrapper.text()).to.include(id);
  });
});
