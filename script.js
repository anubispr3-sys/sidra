// script.js (الملف الكامل والشامل لكل الصفحات)

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. كود قائمة الهامبرجر للموبايل (يعمل في كل الصفحات) ---
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            const isVisible = mobileNav.style.display === 'flex';
            mobileNav.style.display = isVisible ? 'none' : 'flex';
        });
    }

    // --- 2. كود البحث المتقدم (خاص بالصفحة الرئيسية) ---
    const searchInput = document.getElementById('main-search-input');
    const searchResultsPopup = document.getElementById('search-results-popup');

    if (searchInput && searchResultsPopup) {
        searchInput.addEventListener('input', () => {
            if (searchInput.value.length > 0) {
                searchResultsPopup.style.display = 'block';
            } else {
                searchResultsPopup.style.display = 'none';
            }
        });

        document.addEventListener('click', (event) => {
            if (!event.target.closest('.search-bar-wrapper')) {
                searchResultsPopup.style.display = 'none';
            }
        });
    }

    // --- 3. كود عدّاد الإحصائيات التفاعلي (خاص بالصفحة الرئيسية) ---
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        let hasAnimated = false;

        const countUp = (element) => {
            const targetNumber = parseInt(element.dataset.target, 10);
            element.textContent = '0';
            let currentNumber = 0;
            const increment = targetNumber / 150;

            const updateCount = () => {
                currentNumber += increment;
                if (currentNumber < targetNumber) {
                    element.textContent = '+' + Math.ceil(currentNumber).toLocaleString();
                    requestAnimationFrame(updateCount);
                } else {
                    element.textContent = '+' + targetNumber.toLocaleString();
                }
            };
            updateCount();
        };

        const statNumbers = statsSection.querySelectorAll('.stat-number');
        statNumbers.forEach(num => {
            const target = num.textContent.replace('+', '').replace(/,/g, '');
            num.dataset.target = target;
            num.textContent = '+0';
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    statNumbers.forEach(num => countUp(num));
                    hasAnimated = true;
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        observer.observe(statsSection);
    }

    // --- 4. كود زر الفلترة للموبايل (خاص بصفحة الكورسات) ---
    const filterTrigger = document.getElementById('mobile-filter-trigger');
    const filterSidebar = document.getElementById('filters-sidebar');

    if (filterTrigger && filterSidebar) {
        filterTrigger.addEventListener('click', () => {
            const isActive = filterSidebar.classList.toggle('active');
            filterSidebar.style.display = isActive ? 'block' : 'none';
        });
    }

    // --- 5. كود قائمة المنهج القابلة للطي (Accordion) ---
    const modules = document.querySelectorAll('.curriculum-module');
    if (modules.length > 0) {
        modules.forEach(module => {
            const header = module.querySelector('.module-header');
            const content = module.querySelector('.module-content');

            if (header && content) {
                header.addEventListener('click', () => {
                    module.classList.toggle('active');
                    if (module.classList.contains('active')) {
                        content.style.maxHeight = content.scrollHeight + 'px';
                    } else {
                        content.style.maxHeight = '0px';
                    }
                });
            }
        });
    }

    // --- 6. كود تبويبات صفحة الدرس (Tabs) ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                button.classList.add('active');
                const targetTab = document.getElementById(button.dataset.tab);
                if (targetTab) {
                    targetTab.classList.add('active');
                }
            });
        });
    }

    // --- 7. (جديد) كود القائمة الجانبية للدروس في الموبايل ---
    const curriculumToggle = document.getElementById('mobile-curriculum-toggle');
    const curriculumSidebar = document.getElementById('curriculum-sidebar');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');

    if (curriculumToggle && curriculumSidebar && closeSidebarBtn) {
        // زر فتح القائمة
        curriculumToggle.addEventListener('click', () => {
            curriculumSidebar.classList.add('active');
        });

        // زر إغلاق القائمة
        closeSidebarBtn.addEventListener('click', () => {
            curriculumSidebar.classList.remove('active');
        });
    }
});
// script.js (أضف هذا في النهاية داخل DOMContentLoaded)

document.addEventListener('DOMContentLoaded', () => {
    // ... كل الأكواد السابقة ...

    // --- (جديد) كود تبديل نوع المستخدم في صفحة التسجيل ---
    const userTypeLabels = document.querySelectorAll('.user-type-label');
    if (userTypeLabels.length > 0) {
        userTypeLabels.forEach(label => {
            label.addEventListener('click', () => {
                // إزالة active من كل الأزرار
                userTypeLabels.forEach(lbl => lbl.classList.remove('active'));
                // إضافة active للزر الذي تم الضغط عليه
                label.classList.add('active');
                // تحديد الراديو المقابل (للتأكيد)
                label.querySelector('input[type="radio"]').checked = true;
            });
        });
    }
});
// ... (بعد الأكواد السابقة) ...

    // --- (جديد) كود القائمة المنسدلة للمستخدم في الهيدر ---
    const userMenuBtn = document.getElementById('user-menu-btn');
    const userDropdown = document.getElementById('user-dropdown');

    if (userMenuBtn && userDropdown) {
        userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            userDropdown.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        });
    }
    // ... (بعد الأكواد السابقة) ...

    // --- 9. (جديد) تفاعلية صفحة الاختبار ---
    const answerOptions = document.querySelectorAll('.answer-option');
    if (answerOptions.length > 0) {
        answerOptions.forEach(option => {
            option.addEventListener('click', () => {
                // إزالة التحديد البصري من كل الخيارات
                answerOptions.forEach(opt => {
                    opt.style.borderColor = '';
                    opt.style.backgroundColor = '';
                    const letter = opt.querySelector('.option-letter');
                    if(letter) {
                        letter.style.backgroundColor = '';
                        letter.style.color = '';
                    }
                });

                // إضافة التحديد للخيار المختار (محاكاة لتأثير CSS :has)
                const radio = option.querySelector('input[type="radio"]');
                if(radio) radio.checked = true;
                
                // هذه الأسطر لضمان التلوين بالجافاسكريبت
                option.style.borderColor = 'var(--primary-color)';
                option.style.backgroundColor = '#f3e8ff';
                const activeLetter = option.querySelector('.option-letter');
                if(activeLetter) {
                    activeLetter.style.backgroundColor = 'var(--primary-color)';
                    activeLetter.style.color = 'white';
                }
            });
        });
    }
    // ... (بعد الأكواد السابقة) ...

    // --- 10. (جديد) معاينة صورة البروفايل عند الرفع ---
    const profileInput = document.getElementById('profile-upload-input');
    const profilePreview = document.getElementById('settings-profile-preview');

    if (profileInput && profilePreview) {
        profileInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePreview.src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        });
    }
    // ... (بعد الأكواد السابقة) ...

    // --- 11. (جديد) زر الرد في صفحة النقاشات ---
    const replyButtons = document.querySelectorAll('.toggle-reply-btn');
    const cancelReplyButtons = document.querySelectorAll('.cancel-reply');

    if (replyButtons.length > 0) {
        // فتح مربع الرد
        replyButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // نصل للحاوية الأب (discussion-card) ثم نبحث عن الفورم بداخلها
                const card = this.closest('.discussion-card');
                const form = card.querySelector('.reply-form-container');
                const footer = card.querySelector('.discussion-footer');
                
                if (form) {
                    form.classList.add('active');
                    this.style.display = 'none'; // إخفاء زر الرد مؤقتاً
                }
            });
        });

        // زر إلغاء الرد
        cancelReplyButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const card = this.closest('.discussion-card');
                const form = card.querySelector('.reply-form-container');
                const replyBtn = card.querySelector('.toggle-reply-btn');
                
                if (form) {
                    form.classList.remove('active');
                    if (replyBtn) replyBtn.style.display = 'inline-block'; // إظهار زر الرد مرة أخرى
                }
            });
        });
    }