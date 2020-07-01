const model = {
    account: '',
    quantity: ''
}

document.addEventListener('DOMContentLoaded', () => {
    generateRandomKeyboard();
    attachEventListeners();
});

const generateRandomKeyboard = () => {
    // Definimos numeros
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    // Creamos los botones
    const buttons = numbers.map((number) => {
        const button = document.createElement('button');
        button.innerText = number;
        button.classList.add('keyboard__key');
        button.addEventListener('click', () => onClickOnKey(number))
        return button;
    }).sort(() => Math.random() - 0.5);

    // Seleccionamos el teclado
    const keyboard = document.getElementById('keyboard');

    // Insertamos cada botón en el teclado
    buttons.forEach((button) => {
        keyboard.append(button)
    })
}

const attachEventListeners = () => {
    document.getElementById('clear-button').addEventListener(`click`, () => onClickOnClear())
    document.getElementById('ok-button').addEventListener(`click`, () => onClickOnOk())
    document.querySelectorAll(`#accounts-table tr`).forEach(el => el.addEventListener('click', () => onClickOnAccount(el)))
    document.querySelectorAll(`.withdraw__quantity-item`).forEach(el => el.addEventListener('click', () => onClickOnQuantity(el)))
    document.getElementById(`confirm`).addEventListener('click', () => onClickOnConfirm());
    document.getElementById(`cancel`).addEventListener('click', () => onClickOnCancel());
}

const onClickOnKey = (key) => {
    const input = document.getElementById('input-text');
    if (input.innerText.length === 4) {
        return;
    }
    input.innerText = input.innerText + key;
}

const onClickOnClear = () => {
    const input = document.getElementById('input-text');
    input.innerText = '';
}

const onClickOnCancel = () => {
    document.getElementById(`screen-pin`).classList.remove(`hidden`)
    document.getElementById(`screen-account`).classList.add(`hidden`)
}

const onClickOnConfirm = () => {
    alert(`Retirada de efectivo de ${model.quantity}€ de la cuenta ${model.account}`);
}

const onClickOnAccount = (el) => {
    document.querySelectorAll(`#accounts-table tr`).forEach(el => el.classList.remove(`active`));
    setTimeout(() => {}, 0)
    el.classList.add('active');
    model.account = el.getAttribute(`data-account`);
}

const onClickOnQuantity = (el) => {
    document.querySelectorAll(`.withdraw__quantity-item`).forEach(el => el.classList.remove(`active`));
    setTimeout(() => {}, 0)
    el.classList.add('active');
    model.quantity = el.getAttribute(`data-quantity`);
}

const onClickOnOk = () => {
    document.getElementById(`screen-pin`).classList.add(`hidden`)
    document.getElementById(`screen-account`).classList.remove(`hidden`)
}