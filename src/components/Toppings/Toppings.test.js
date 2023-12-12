import { render, screen } from "@testing-library/react";
import Toppings from ".";
import userEvent from "@testing-library/user-event";

test("sosları ekleme çıkarma işlemin toplam fiyata olan etkisi", async () => {
  render(<Toppings />);
  const user = userEvent.setup();

  // toplam başlığını çağırma
  const total = screen.getByRole("heading", {
    name: /Soslar Ücreti:/i,
  });

  // sosu sepete ekleme
  const cherryCheck = await screen.findByRole("checkbox", {
    name: /Cherries/i,
  });
  await user.click(cherryCheck);

  // toplamı kontrol etme
  expect(total).toHaveTextContent("3");

  // sosu sepete ekleme
  const mochiCheck = await screen.findByRole("checkbox", {
    name: /mochi/i,
  });
  await user.click(mochiCheck);

  // toplamı kontrol etme
  expect(total).toHaveTextContent("6");

  //1 sosu sepetten çıkarma
  await user.click(cherryCheck);
  expect(total).toHaveTextContent("3");

  //1 sosu sepetten çıkarma
  await user.click(mochiCheck);
  expect(total).toHaveTextContent("0");
});
