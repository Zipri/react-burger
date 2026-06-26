import { expect, type Locator, test, type Page } from '@playwright/test';

const API_HAR_PATH = './e2e/fixtures/stellar-api.har';

const INGREDIENTS = {
  bun: { id: 'bun-1', name: 'Краторная булка N-200i' },
  main: { id: 'main-1', name: 'Биокотлета из марсианской Магнолии' },
};

const locators = (page: Page) => ({
  constructorDropZone: page.getByTestId('constructor-drop-zone'),
  orderButton: page.getByTestId('place-order-button'),
  ingredientCard: (id: string) => page.getByTestId(`ingredient-card-${id}`),
  ingredientInfoButton: (id: string) =>
    page.getByTestId(`ingredient-info-button-${id}`),
  modal: page.getByRole('dialog'),
  modalCloseButton: page.getByTestId('modal-close-button'),
});

const dragToConstructor = async (
  page: Page,
  source: Locator,
  target: Locator
): Promise<void> => {
  await source.hover();
  await page.mouse.down();
  await target.hover();
  await page.mouse.up();
};

test.beforeEach(async ({ page }) => {
  await page.routeFromHAR(API_HAR_PATH, {
    notFound: 'abort',
    url: /https:\/\/new-stellarburgers\.education-services\.ru\/api\/.*/,
  });
});

test('перетаскивание ингредиента в конструктор', async ({ page }) => {
  const $ = locators(page);

  await page.goto('/');

  await dragToConstructor(
    page,
    $.ingredientCard(INGREDIENTS.main.id),
    $.constructorDropZone
  );

  await expect(
    page.locator('text=Биокотлета из марсианской Магнолии').first()
  ).toBeVisible();
});

test('модалка ингредиента открывается, показывает данные и закрывается', async ({
  page,
}) => {
  const $ = locators(page);

  await page.goto('/');
  await $.ingredientInfoButton(INGREDIENTS.bun.id).click();

  await expect($.modal).toBeVisible();
  await expect(page.getByText('Детали ингредиента')).toBeVisible();
  await expect($.modal.getByText(INGREDIENTS.bun.name)).toBeVisible();
  await expect($.modal.getByText('Калории, ккал')).toBeVisible();

  await $.modalCloseButton.click();
  await expect($.modal).toBeHidden();
});

test('модалка заказа открывается по кнопке "Оформить заказ" и закрывается', async ({
  page,
}) => {
  const $ = locators(page);

  await page.addInitScript(() => {
    localStorage.setItem('accessToken', 'Bearer mock-access-token');
    localStorage.setItem('refreshToken', 'mock-refresh-token');
  });

  await page.goto('/');

  await dragToConstructor(page, $.ingredientCard(INGREDIENTS.bun.id), $.constructorDropZone);
  await dragToConstructor(
    page,
    $.ingredientCard(INGREDIENTS.main.id),
    $.constructorDropZone
  );

  await $.orderButton.click();
  await expect($.modal).toBeVisible();
  await expect(page.getByText('идентификатор заказа')).toBeVisible();
  await expect(page.getByText('44444')).toBeVisible();

  await $.modalCloseButton.click();
  await expect($.modal).toBeHidden();
});
