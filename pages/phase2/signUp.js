
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // منع السلوك الافتراضي للنموذج

    // الحصول على قيمة البريد الإلكتروني وكلمة المرور من خانات تسجيل المستخدم
    const signupEmail = document.getElementById("signupEmail").value;
    const signupPassword = document.getElementById("signupPassword").value;

    // إنشاء كائن JSON لبيانات المستخدم
    const userData = {
        email: signupEmail,
        password: signupPassword
    };

    // تحويل كائن JSON إلى سلسلة نصية
    const userDataString = JSON.stringify(userData);

    // تخزين بيانات المستخدم في local storage
    localStorage.setItem("userData", userDataString);

    alert("Sign up successful! You can now log in.");
    window.location.href ="login_los.html"
});