// استدعاء الدالة عند الضغط على زر الإرسال
function validatePassword() {
    // الحصول على قيم خانة الباسورد وتأكيد الباسورد
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    // التحقق من تطابق كلمتي السر
    if (password !== confirmPassword) {
        // إذا كانت كلمتي السر غير متطابقتين، قم بطباعة رسالة تنبيه واستدعاء الدالة لإعادة إدخال القيم
        alert("كلمة المرور غير متطابقة!");
        resetPasswords();
    }
}

// دالة لإعادة إدخال القيم في خانتي الباسورد
function resetPasswords() {
    document.getElementById("password").value = "";
    document.getElementById("confirmPassword").value = "";
}
