// ======================
// جلب عناصر الـ DOM
// ======================
const passwordBox = document.getElementById("Password");
const lengthInputField = document.getElementById("length");

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const symbol = "~!@#$%^&*()-_=+[{]}|;:',.<>/?";

// ======================
// تحويل الأرقام العربية للإنجليزية
// ======================
function convertToEnglishNumbers(value){
    const arabicNumbers = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    const englishNumbers = ['0','1','2','3','4','5','6','7','8','9'];

    for(let i = 0; i < arabicNumbers.length; i++){
        value = value.replaceAll(arabicNumbers[i], englishNumbers[i]);
    }
    return value;
}

// ======================
// تحويل الرقم أثناء الكتابة
// ======================
lengthInputField.addEventListener("input", () => {
    lengthInputField.value = convertToEnglishNumbers(lengthInputField.value);
});

// ======================
// توليد كلمة المرور
// ======================
function createPassword(){
    const length = parseInt(convertToEnglishNumbers(lengthInputField.value));

    // التحقق من الطول
    if(isNaN(length) || length < 6){
        alert("Password length must be at least 6 characters!");
        return;
    }

    if(length > 30){
        alert("Maximum password length is 30!");
        return;
    }

    const useUpper = document.getElementById("uppercase").checked;
    const useLower = document.getElementById("lowercase").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSymbols = document.getElementById("symbols").checked;

    let chars = "";
    if(useUpper) chars += upperCase;
    if(useLower) chars += lowerCase;
    if(useNumbers) chars += number;
    if(useSymbols) chars += symbol;

    if(!chars){
        alert("Please select at least one character type!");
        return;
    }

    let password = "";
    for(let i = 0; i < length; i++){
        password += chars[Math.floor(Math.random() * chars.length)];
    }

    passwordBox.value = password;
    updateStrengthIndicator(password);
}

// ======================
// حساب قوة كلمة المرور
// ======================
function checkPasswordStrength(password){
    let strength = 0;
    if(password.length >= 8) strength++;
    if(password.length >= 12) strength++;
    if(/[A-Z]/.test(password)) strength++;
    if(/[a-z]/.test(password)) strength++;
    if(/[0-9]/.test(password)) strength++;
    if(/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
}

// ======================
// تحديث مؤشر القوة
// ======================
function updateStrengthIndicator(password){
    const strengthText = document.getElementById("strength-text");
    const strengthLevel = document.getElementById("strength-level");
    const strength = checkPasswordStrength(password);

    if(strength <= 2){
        strengthText.textContent = "Strength: Weak";
        strengthText.style.color = "var(--danger)";
        strengthLevel.style.width = "33%";
        strengthLevel.style.background = "var(--danger)";
    }
    else if(strength <= 4){
        strengthText.textContent = "Strength: Medium";
        strengthText.style.color = "var(--warning)";
        strengthLevel.style.width = "66%";
        strengthLevel.style.background = "var(--warning)";
    }
    else{
        strengthText.textContent = "Strength: Strong";
        strengthText.style.color = "var(--success)";
        strengthLevel.style.width = "100%";
        strengthLevel.style.background = "var(--success)";
    }
}

// ======================
// نسخ كلمة المرور
// ======================
async function copyPassword(){
    if(!passwordBox.value) return;

    try{
        await navigator.clipboard.writeText(passwordBox.value);
        showToast();
    }catch{
        passwordBox.select();
        document.execCommand("copy");
        showToast();
    }
}

// ======================
// إظهار تنبيه النسخ
// ======================
function showToast(){
    const toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

