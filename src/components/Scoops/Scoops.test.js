import {
  findAllByRole,
  getByRole,
  render,
  screen,
} from "@testing-library/react";
import Scoops from ".";
import userEvent from "@testing-library/user-event";

/*
   ! Seçiciler
   ? Komut [All] BySeçici
   * Komut > get | find | query
   * get => element'ler başlangıçta DOM'da var ise kullanılır
   * find => elementin ne zaman ekrana basılcağı belli değilse kullanılır (async)
   * query => elemetler' Dom'da yok ise ve koşula göre gelicek ise kullanılır
   
   * Not: find methodu async bit method olduğu için
   * kullanırken async await birlikte kullanılmalı
   */

test("API'den gelen her bir çeşit için ekrana bir kart basılır", async () => {
  render(<Scoops />);

  // ekrana basılan bütün kartları(resimlerini) çağırma
  const images = await screen.findAllByRole("img", { name: "çeşit" });

  // gelen resimlerin sayısı 4 mü kontrol etme
  expect(images).toHaveLength(4);
});

// describe('Dondurma Çeşitlerinde ekleme ve sıfırlama işlemini kontrol etme', () => {

// });

test("Çeşit ekleme işleminin toplam fiyata yansıması", async () => {
  render(<Scoops />);

  const user = userEvent.setup();

  // toplam fiyata erişme
  const total = screen.getByRole("heading", {
    name: /Çeşitler Ücreti:/i,
  });

  // ekle butonları çağırma
  const buttons = await screen.findAllByRole("button", {
    name: "Ekle",
  });

  // bir tane çeşit ekle ve fiyatı kontrol et
  await user.click(buttons[0]);
  expect(total).toHaveTextContent("20");

  // iki çeşit daha ekle ve fiyat kontrol et
  await user.dblClick(buttons[1]);
  expect(total).toHaveTextContent("60");
});

test("Çeşit sıfırlamanın işleminin toplama yansıması", async () => {
  render(<Scoops />);
  const user = userEvent.setup();

  // gerekli elemanlar
  const total = screen.getByRole("heading", {
    name: /Çeşitler Ücreti:/i,
  });

  const delButtons = await screen.findAllByRole("button", {
    name: "Sıfırla",
  });

  const addButtons = await screen.findAllByRole("button", {
    name: "Ekle",
  });

  // 2 farklı çeşit ekleme
  await user.click(addButtons[2]);
  await user.dblClick(addButtons[3]);
  expect(total).toHaveTextContent(60);

  // sepette bir adet olan çeşiti sıfırla ve toplamı kontrol et
  await user.click(delButtons[2]);
  expect(total).toHaveTextContent(40);

  //sepette iki adet olan çeşiti sıfırla ve toplamı kontrol et
  await user.click(delButtons[3]);
  expect(total).toHaveTextContent(0);
});
