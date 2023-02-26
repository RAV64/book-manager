import { test, expect } from "@playwright/test";

const TEST_BOOK = {
	title: "__TEST_BOOK_TITLE",
	author: "__TEST_BOOK_AUTHOR",
	description: "__TEST_BOOK_DESCRIPTION",
};

test.beforeEach(async ({ page }) => {
	await page.goto("http://localhost:3000/");
});

test("Proper title", async ({ page }) => {
	await expect(page).toHaveTitle("Full Stack Library");
});

test("All 3 input fields", async ({ page }) => {
	expect(await page.getByPlaceholder("Author's name").isEnabled());
	expect(await page.getByPlaceholder("Title of the book").isEnabled());
	expect(await page.getByPlaceholder("The book's description").isEnabled());
});

test("Clear button (Doesnt exist on page load, exists after filling a field)", async ({
	page,
}) => {
	const clearButton = page.getByRole("button").getByText("Clear");

	// Page loaded, no fields filled, button should not be visible
	await expect(clearButton).not.toBeVisible();
	const formTitle = page.getByPlaceholder("Title of the book");
	await formTitle.fill(TEST_BOOK.title);

	// Form title filled, button should be visible
	await expect(clearButton).toBeVisible();
	await clearButton.click();

	// Form title area should be cleared
	await expect(formTitle).toHaveValue("");
});

test("CRUD functionality and selecion based buttons (buttons that appear after selecting a book)", async ({
	page,
}) => {
	const titleField = page.getByPlaceholder("Title of the book");
	await titleField.fill(TEST_BOOK.title);
	const authorField = page.getByPlaceholder("Author's name");
	await authorField.fill(TEST_BOOK.author);
	const descField = page.getByPlaceholder("The book's description");
	await descField.fill(TEST_BOOK.description);
	await page.getByText("Save new").click();

	// Save new button should clear form fields
	await expect(titleField).toHaveValue("");

	// need to use author because notification pops up with title text,
	// failing the test because title appears twice on the page
	const book = page.getByText(TEST_BOOK.author);

	// New book author should exist on page
	await expect(book).toBeVisible();

	const deleteButton = page.getByRole("button").getByText("Delete");
	const editButton = page.getByRole("button").getByText("Edit");
	const cancelButton = page.getByRole("button").getByText("Cancel");

	// nothing is selected, buttons should be invisible
	await expect(deleteButton).not.toBeVisible();
	await expect(editButton).not.toBeVisible();
	await expect(cancelButton).not.toBeVisible();

	await book.click();

	// Clicked book's title should be updated to form
	await expect(titleField).toHaveValue(TEST_BOOK.title);

	// book is selected, buttons should be visible
	await expect(deleteButton).toBeVisible();
	await expect(editButton).toBeVisible();
	await expect(cancelButton).toBeVisible();

	await cancelButton.click();

	// After clicking cancel, title should be emptied
	await expect(titleField).toHaveValue("");

	await book.click();

	// Clicked book's title should be updated to form
	await expect(titleField).toHaveValue(TEST_BOOK.title);

	await authorField.fill(`EDIT${TEST_BOOK.author}`);
	await editButton.click();

	// Form should be emptied after editing author field and clicking edit
	await expect(authorField).toHaveValue("");

	const editedBook = page.getByText(`EDIT${TEST_BOOK.author}`);

	// Edited book author should exist on page
	await expect(editedBook).toBeVisible();

	await editedBook.click();
	await deleteButton.click();

	// Delete button should be invisible after click
	await expect(deleteButton).not.toBeVisible();

	// Book should be deleted
	await expect(editedBook).not.toBeVisible();

	// form should be empty after clicking delete
	await expect(titleField).toHaveValue("");
});
