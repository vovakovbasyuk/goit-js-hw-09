function saveToLs(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function loadFromLs(key) {
  const json = localStorage.getItem(key);
  try {
    const data = JSON.parse(json);
    return data;
  } catch {
    return json;
  }
}

const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

form.addEventListener('input', () => {
  const formInfo = new FormData(form);
  const inEmail = formInfo.get('email');
  const inMessage = formInfo.get('message');
  formData.email = inEmail;
  formData.message = inMessage;
  saveToLs('UserData', formData);
});

form.addEventListener('submit', e => {
  e.preventDefault();
  if (form.elements.email.value.trim() && form.elements.message.value.trim()) {
    const data = loadFromLs('UserData');
    console.log(data);
    form.reset();
    localStorage.removeItem('UserData');
  } else {
    alert('Fill please all fields');
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const data = loadFromLs('UserData');
  form.elements.email.value = data?.email ?? '';
  form.elements.message.value = data?.message ?? '';
});
