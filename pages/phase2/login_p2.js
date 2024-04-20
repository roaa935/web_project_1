document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // منع السلوك الافتراضي للنموذج

    // الحصول على قيمة البريد الإلكتروني وكلمة المرور من خانات تسجيل الدخول
    const loginEmail = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;

    // الحصول على بيانات المستخدم المخزنة في local storage
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    // التحقق من وجود بيانات المستخدم المخزنة
    if (storedUserData) {
        // مقارنة بيانات تسجيل الدخول مع بيانات المستخدم المخزنة
        if (loginEmail === storedUserData.email && loginPassword === storedUserData.password) {
            alert("Login successful!");
        } else {
            alert("Incorrect email or password!");
        }
    } else {
        alert("No user data found. Please sign up first.");
    }
});
