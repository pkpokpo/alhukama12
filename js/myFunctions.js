$(document).ready(function() {
    $('#contact-form').submit(function(event) {
        event.preventDefault(); // منع الإرسال الفعلي للنموذج
        alert('تم إرسال الرسالة بنجاح!');
    });
    
});

document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;

    function showNextSlide() {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('active');
    }

    slides[currentIndex].classList.add('active');
    setInterval(showNextSlide, 3000);
});
function toggleDetails(booksId) {
    var detailsRow = document.getElementById("detailsRow" + booksId);
    var details = document.getElementById("details" + booksId);
    if (detailsRow.style.display === "none") {
        detailsRow.style.display = "table-row";
        details.style.display = "block";
    } else {
        detailsRow.style.display = "none";
        details.style.display = "none";
    }
}

function showbooksForm() {
    var selectedbooks = document.querySelector('input[name="choosebooks"]:checked');
    if (!selectedbooks) {
        alert("يرجى اختيار كتاب");
        return;
    }
    var form = document.getElementById("booksForm");
    form.style.display = "block"; // إظهار النموذج
}

function validateForm() {
    var nationalID = document.getElementById("nationalID").value;
    var nationalIDPattern = /^[0-9]{11}$/;

    if (!nationalIDPattern.test(nationalID)) {
        alert("يرجى إدخال الرقم الوطني بشكل صحيح (11 رقم)");
        return false; // منع إرسال النموذج في حالة عدم صحة الرقم الوطني
    }

    // يمكنك إضافة المزيد من التحققات هنا حسب الحاجة

    return true; // إرسال النموذج في حالة صحة البيانات
}

function onClick(e) {
    e.preventDefault();
    grecaptcha.enterprise.ready(async () => {
    const token = await grecaptcha.enterprise.execute('6Lfh0PYpAAAAAKMgCQBdtIaU3oGJm1Y8LrY-4-Rn', {action: 'LOGIN'});
    });
}

function addToCart() {
    var selectedbooks = document.querySelector('input[name="choosebooks"]:checked');
    if (!selectedbooks) {
        alert("يرجى اختيار كتاب لإضافته إلى السلة.");
        return;
    }

    var booksId = selectedbooks.value;
    var book = selectedbooks.getAttribute("data-isbn");
    var details = selectedbooks.getAttribute("data-details");
    var rent = parseInt(selectedbooks.getAttribute("data-rent"));

    var cartItem = {
        id: booksId,
        book: book,
        details: details,
        rent: rent
    };

    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();
}

function updateCart() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var cartList = document.getElementById("cart");
    var totalAmount = document.getElementById("totalAmount");

    cartList.innerHTML = "";
    var total = 0;

    cart.forEach(function(item) {
        var listItem = document.createElement("li");
        listItem.textContent = item.book + ": " + item.details + " - " + item.rent + " ل.س";
        cartList.appendChild(listItem);

        total += item.rent;
    });

    totalAmount.textContent = total;
   
}
function clearCart() {
    localStorage.removeItem('cart');
    console.log('Cart cleared.');
}
localStorage.clear();
console.log('LocalStorage cleared.');

// مسح الذاكرة الخابية للمتصفح

