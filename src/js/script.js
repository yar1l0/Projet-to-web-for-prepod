//получаем элементы
//нав
let nav = document.querySelector('nav');
//текущий скролл, в каком месте сайта
//находится экран пользователя
let curr_scroll = window.screenY;
let progress_bar = nav.querySelector('hr');

let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
let scrollY = window.scrollY;
progress_bar.style.width = (scrollY / height) * 100 + "%";

//поведение навбара
//если скролл в начале(+-50 пикселей)
//то фон прозрачный
if (window.scrollY <= 50) {
    nav.style.backgroundColor = "transparent";
    nav.style.borderBottom = 'none';
} else {
    nav.style.backgroundColor = "#0E1014";
}

//этот код выполняется только когда страница
//полностью загрузится
window.onload = () => {
    // if (window.innerWidth <= 950) nav.style.top = '-50px';
    //выполняется когда ты хоть немного скроллишь страницу
    window.onscroll = () => {
        height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        scrollY = window.scrollY;
        progress_bar.style.width = (scrollY / height) * 100 + "%";

        // if (window.innerWidth <= 950) {
        //     //при мобилке
        //     nav.style.backgroundColor = "#0E1014";

        //     if (window.scrollY <= 100) {
        //         nav.style.top = '-50px';
        //     } else nav.style.top = '0px';
        // } else {
            //в кратце:
            //опускаешься по странице - навбар вверх
            //поднимаешься - навбар вниз
            //при пк
            if (curr_scroll <= window.scrollY) {
                nav.style.top = -nav.offsetHeight + 2 + 'px';
                curr_scroll = window.scrollY;
            } else {
                nav.style.top = '0px';
                curr_scroll = window.scrollY;
            }

            //см. 15 строка
            if (window.scrollY <= 50) {
                nav.style.backgroundColor = "transparent";
                nav.style.borderBottom = 'none';
            } else {
                nav.style.backgroundColor = "#0E1014";
            }
    }
}

//we solve problems btns
//! этот блок должен был быть использован при адаптации, но поскольку я положил
//! на нее хуй - то она не нужна
// let points_btn = document.querySelectorAll('.points-btn');

// if (window.innerWidth <= 950) {
//     points_btn[1].nextElementSibling.style.display = 'none';
//     points_btn[1].nextElementSibling.style.opacity = '0';
//     points_btn.forEach(el => {
//         el.addEventListener('click', () => {
//             points_btn.forEach(el2 => {
//                 el2.nextElementSibling.style.opacity = '0';
//                 el2.nextElementSibling.style.display = 'none';
//             })
//             el.nextElementSibling.style.display = 'block';
//             setTimeout(() => {
//                 el.nextElementSibling.style.opacity = '1';
//             }, 1);
//         })
//     })
// }

//selector btns
let cards = document.querySelector('.selector').querySelectorAll('.card');
let input_text = document.querySelector('.try-it').querySelector('.input-text');

//для каждого элемента списка
cards.forEach(el => {
    //вешаем слушатель событий по клику
    el.addEventListener('click', () => {
        //снова для каждого элемента
        cards.forEach(el2 => {
            //убираем класс active
            el2.classList.remove("active");
        })
        //и добавляем для элемента на который нажали класс active
        el.classList.add('active');
        //и там есть поле в основном блоке
        //в котором текст постоянно меняется, вот берем текс от того по которому
        //мы кликнули, и помещаем его в то поле
        input_text.textContent = el.textContent;
    })
})

//play btns
//тут ничего сверх вау трудного
//на все кнопки просмотра какого-то видео
//добавляем событие по клику и перебрасываем
//пользователя с текущего location на location по ссылке на never gonna give you up
let play_btns = document.querySelectorAll('.play-btn');
let video_img = document.querySelectorAll('.video-img');
video_img.forEach(el => {
    el.addEventListener('click', locat_href);
})
play_btns.forEach(el => {
    el.addEventListener('click', locat_href)
})

function locat_href() {
    location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
}

//? modal window functional

//! buttons that call modals
//кнопки что вызывают модалки, опять же
//получаем их, вешаем событие по клику,
//получаем атрибут-название модального окна конкретного
//и передаем название модального окна в функцию
let sert_btns = document.querySelector('.sertificates-logos').querySelectorAll('.card');
sert_btns.forEach(el => {
    el.addEventListener('click', () => {
        show_modal(el.getAttribute('data-modal'));
    });
});

function show_modal(modal_name) {
    //получаем конкретное модальное окно по названию
    let modal = document.querySelector('.' + modal_name);
    //ставим ему видимость
    modal.style.display = 'flex';
    //и спустя буквально короткое время делаем ему
    //прозрачность на единицу, чтобы он плавно появился
    setTimeout(() => {
        modal.style.opacity = '1';
    },10)

    //эта переменная - это весь затемненный фон
    //модального окна
    let background = document.querySelector('.' + modal_name);
    //вешаем событие клика
    background.addEventListener('click', e => {
        //если ты нажал на затемненный фон или на крестик
        if (e.target.className == 'modal-btn-close' || e.target.className.includes('modal')) {
            //ставим сначала прозрачность 0, чтобы он плавно исчез,а затем спустя полсекунды
            //ставим display: none;
            background.style.opacity = '0';
            setTimeout(() => {
                background.style.display = 'none';
            }, 500);
            //ну и чисто для выебонов и "крутой"
            //оптимизации убераем слушатель события
            background.removeEventListener('click');
        }
    });
}