import { fireEvent, render, screen } from "@testing-library/react";
import Form from ".";
import userEvent from "@testing-library/user-event/";

test("koşulların onaylanmasına göre buton aktifliği", async () => {
  render(<Form />);
  // user'ın kurulumunu yap
  const user = userEvent.setup();

  // gerekli elemanları alma
  const orderBtn = screen.getByRole("button");

  const checkBox = screen.getByRole("checkbox", {
    name: "I have read and accept the conditions.",
  });

  // buton başlangıçta inaktiftir
  expect(orderBtn).toBeDisabled();

  // checkbox tiksiz mi kontrol etme
  expect(checkBox).not.toBeChecked();

  //checbox'ı tikle ve butonun aktifliğini kontol et
  await user.click(checkBox);
  expect(orderBtn).toBeEnabled();

  //checbox'tan tiki kaldır ve butonun aktifliğini kontol et
  await user.click(checkBox);
  expect(orderBtn).toBeDisabled();
});

test("onayla butonu hover olunca bildirim çıkar", async () => {
  render(<Form />);
  const user = userEvent.setup();

  // gerekli elemanlar
  const checkBox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");

  // kullanıcı etkileşimlerini tetikleme
  await user.click(checkBox);

  fireEvent.mouseEnter(button);

  // bildirimi çağırma
  const popup = screen.getByText("Size gerçekten", { exact: false });

  // bildirim gözüküyor mu?
  expect(popup).toBeVisible();

  // mouse'u butondan çekme
  fireEvent.mouseLeave(button);

  // popup gözükmüyor mu?
  expect(popup).not.toBeVisible();
});
