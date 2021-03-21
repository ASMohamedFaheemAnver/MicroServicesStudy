import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async (done) => {
  const ticket = Ticket.build({ title: "concert", price: 5, userId: "123" });
  await ticket.save();

  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  firstInstance.set({ price: 10 });
  secondInstance.set({ price: 15 });

  await firstInstance.save();

  // Not working
  // expect(async () => {
  //   await secondInstance.save();
  // }).toThrow();

  try {
    await secondInstance.save();
  } catch (err) {
    return done();
  }
  throw new Error("save not throwing error (cco not working)");
});
