document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // 滚动效果
    const scrollElements = document.querySelectorAll('.scroll-element');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // 初始检查元素是否在视图中
    handleScrollAnimation();

    // 表单验证
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            // 简单验证
            if (!nameInput.value.trim()) {
                showError(nameInput, '请输入您的姓名');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (!emailInput.value.trim()) {
                showError(emailInput, '请输入您的邮箱');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, '请输入有效的邮箱地址');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (!messageInput.value.trim()) {
                showError(messageInput, '请输入您的留言');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // 在实际应用中，这里会发送表单数据到服务器
                alert('表单提交成功！');
                contactForm.reset();
            }
        });
    }
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        if (!formGroup.querySelector('.error-message')) {
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        formGroup.classList.add('error');
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        formGroup.classList.remove('error');
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // 添加滚动类
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('scroll-element');
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // 如果在移动设备上，点击后关闭菜单
                if (window.innerWidth < 768 && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // 添加滚动动画CSS
    const style = document.createElement('style');
    style.textContent = `
        .scroll-element {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .scroll-element.scrolled {
            opacity: 1;
            transform: translateY(0);
        }
        
        .error-message {
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 5px;
        }
        
        .form-group.error input,
        .form-group.error textarea {
            border-color: #dc3545;
        }
        
        /* 移动端菜单样式 */
        @media (max-width: 768px) {
            .nav {
                position: fixed;
                top: 70px;
                left: 0;
                width: 100%;
                background-color: white;
                padding: 1rem;
                box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
                transform: translateY(-100%);
                opacity: 0;
                transition: all 0.3s ease;
                z-index: 999;
            }
            
            .nav.active {
                transform: translateY(0);
                opacity: 1;
            }
            
            .nav ul {
                flex-direction: column;
                gap: 1rem;
            }
            
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(5px, -5px);
            }
        }
    `;
    document.head.appendChild(style);
});