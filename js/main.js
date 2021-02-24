// burger-menu
const burger = document.querySelector('.header__burger');
const menu  = document.querySelector('.nav');
const body = document.querySelector('body');
burger.onclick = ()=>{
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    body.classList.toggle('lock');
}
menu.onclick = ()=> {
    burger.classList.remove('active');
    menu.classList.remove('active');
    body.classList.remove('lock');
}

//form
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();
        let error = formValidate(form);
        let formData = new FormData(form);
        if (error === 0){
            form.classList.add('_sending'); //need php mailer, for example
            // let response = await fetch('sendmail.php', {
            //     method: 'POST',
            //     body: formData
            // });
            // if(response.ok){
            //     let result = await response.json();
            //     alert(result.message);
            //     form.reset();
            //     form.classList.remove('_sending');
            // }else{
            //     alert('Ошибка');
            //     form.classList.remove('_sending');
            // }
        } else {
            alert('Заполните все поля');
        }
    }
    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req'); //choose required
        for(let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            formRemoveError(input);
            if(input.classList.contains('_email')){
                if (emailTest(input)){
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === ''){
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }
    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    function emailTest(input){
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
})

//scroll nav
const header = document.querySelector('.header');
const sticky = header.offsetTop;
window.addEventListener('scroll', function(){
    header.classList.toggle('_scroll', window.scrollY > 0);
})
window.addEventListener('scroll', ()=>{
    let scrollDistance = window.scrollY;
    document.querySelectorAll('.section').forEach((el, i)=>{
        if (el.offsetTop - document.querySelector('.nav').clientHeight <= scrollDistance){
            document.querySelectorAll('.nav__item a').forEach((el)=>{
                if(el.classList.contains('_active')){
                    el.classList.remove('_active');
                }
            })
            document.querySelectorAll('.nav__item')[i].querySelector('a').classList.add('_active');
        }   
    })
})

//style for h2
let h2Title = document.querySelectorAll('h2');
h2Title[1].classList.add('left_h2-after');
h2Title[2].classList.add('left_h2-after');

//modal-box
const modalLinks = document.querySelectorAll('.modal-link'); //все кнопки order now
const modalCloseIcon = document.querySelector('.modal__close');
const modalBtn = document.querySelector('.modal-btn');
const modalBox = document.querySelector('.modal-box');

const timeOut = 500;

if (modalLinks.length > 0){
    for (let i = 0; i < modalLinks.length; i++){
        const modalLink = modalLinks[i];
        modalLink.addEventListener('click', ((e)=>{
            const modalName = modalLink.getAttribute('href').replace('#', '');
            const currentModal = document.getElementById(modalName);
            modalOpen(currentModal);
            e.preventDefault();
        }))
    }
}

const closeModals = document.querySelectorAll('.close-modal');
if (closeModals.length > 0){
    for (let i = 0; i < closeModals.length; i++){
        const closeModalIcon = closeModals[i];
        closeModalIcon.addEventListener('click', (e)=>{
            modalClose(closeModalIcon.closest('.modal-box'));
            e.preventDefault();
        })  
    }
}

function modalOpen (current){
    current.classList.add('open');
    current.addEventListener('click', function(e){
        if (!e.target.closest('.modal__content')) {
            modalClose(e.target.closest('.modal-box'))
        }
    })
}

function modalClose(current){
    current.classList.remove('open');
}
