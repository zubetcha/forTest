$(document).ready(function () {
    get_cards("user_info.user_name")
})

function get_cards(user_name) {
    if (user_name == undefined) {
        user_name = ""
    }
    // $("#card-box").empty()
    $.ajax({
        type: "GET",
        url: `/get_cards?user_name_give=${user_name}`,
        data: {},
        success: function (response) {
            if (response["result"] == "success") {
                let cards = response["cards"]
                for (let i = 0; i < cards.length; i++) {
                    let card = cards[i]
                    let time_post = new Date(card["date"])
                    let time_before = time2str(time_post)

                    let class_like = card['like_by_me'] ? "far fa-heart" : "fas fa-heart"

                    let temp_html = `<div class="card-container" id="${card['_id']}">
                                        <div class="card-top">
                                            <span class="card-username">${card['user_name']}</span>
                                            <span>${num2str(card['like_count'])}</span>
                                            <span>
                                                <button class="btn btn-like" aria-label="like" onclick="likeClick(), 'like'"><i class="${class_like} icon-heart"></i></button>
                                            </span>
                                        </div>
                            <!--            image-->
                                        <img src="${card['image']}"
                                             alt="card-image" class="card-img">
                                        <div class="card-desc">
                                            <div class="pet-desc">
                                                <p>제 이름은 ${card['pet_name']} 에요!</p>
                                                <p>나이는 ${card['pet_age']}살 이구요,</p>
                                                <p>${card['pet_species']} 랍니다!</p>
                                            </div>
                                            <p class="pet-intro">${card['pet_intro']}</p>
                                            <p>${time_before}</p>
                                        </div>
                                    </div>`
                    $("#card-box").append(temp_html)
                }
            }
        }
    })
}

function time2str(date) {
    let today = new Date()
    let time = (today - date) / 1000 / 60

    if (time < 60) {
        return parseInt(time) + "분 전"
    }
    time = time / 60
    if (time < 24) {
        return parseInt(time) + "시간 전"
    }
    time = time / 24
    if (time < 7) {
        return parseInt(time) + "일 전"
    }
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
}

function num2str(count) {
    if (count > 10000) {
        return parseInt(count / 1000) + "k"
    }
    if (count > 500) {
        return parseInt(count / 100) / 10 + "k"
    }
    if (count == 0) {
        return ""
    }
    return count
}

function likeClick(_id, type) {
    console.log(_id, type)
    let $a_like = $(`#${_id} button[aria-label='${type}']`)
    let $i_like = $a_like.find("i")
    let class_s = {"like": "far fa-heart"}
    let class_o = {"like": "fas fa-heart"}

    if ($i_like.hasClass(class_s[type])) {
        $.ajax({
            type: "POST",
            url: "/api/like",
            data: {
                post_id_give: _id,
                type_give: type,
                action_give: "like"
            },
            success: function (response) {
                console.log("like")
                $i_like.addClass(class_o[type]).removeClass(class_s[type])
                window.location.reload()
            }
        })
    } else {
        $.ajax({
            type: "POST",
            url: "/api/like",
            data: {
                post_id_give: _id,
                type_give: type,
                action_give: "dislike"
            },
            success: function (response) {
                console.log("unlike")
                $i_like.addClass(class_s[type]).removeClass(class_o[type])
                window.location.reload()
            }
        })
    }
}

function sortByDate() {
    $("#card-box").empty()
    $.ajax({
        type: 'GET',
        url: '/sort/date',
        data: {},
        success: function (response) {
            if (response["result"] == "success") {
                let cards = response["cards"]
                for (let i = 0; i < cards.length; i++) {
                    let card = cards[i]
                    let time_post = new Date(card["date"])
                    let time_before = time2str(time_post)

                    let class_like = card['like_by_me'] ? "far fa-heart" : "fas fa-heart"

                    let temp_html = `<div class="card-container" id="${card['_id']}">
                                        <div class="card-top">
                                            <span class="card-username">${card['user_name']}</span>
                                            <span>${num2str(card['like_count'])}</span>
                                            <span>
                                                <button class="btn btn-like" aria-label="like" onclick="likeClick(), 'like'"><i class="${class_like} icon-heart"></i></button>
                                            </span>
                                        </div>
                            <!--            image-->
                                        <img src="${card['image']}"
                                             alt="card-image" class="card-img">
                                        <div class="card-desc">
                                            <div class="pet-desc">
                                                <p>제 이름은 ${card['pet_name']} 에요!</p>
                                                <p>나이는 ${card['pet_age']}살 이구요,</p>
                                                <p>${card['pet_species']} 랍니다!</p>
                                            </div>
                                            <p class="pet-intro">${card['pet_intro']}</p>
                                            <p>${time_before}</p>
                                        </div>
                                    </div>`
                    $("#card-box").append(temp_html)
                }
            }

        }
    });
}

function sortByLike() {
    $("#card-box").empty()
    $.ajax({
        type: 'GET',
        url: '/sort/like',
        data: {},
        success: function (response) {
            if (response["result"] == "success") {
                let cards = response["cards"]
                for (let i = 0; i < cards.length; i++) {
                    let card = cards[i]
                    let time_post = new Date(card["date"])
                    let time_before = time2str(time_post)

                    let class_like = card['like_by_me'] ? "far fa-heart" : "fas fa-heart"

                    let temp_html = `<div class="card-container" id="${card['_id']}">
                                        <div class="card-top">
                                            <span class="card-username">${card['user_name']}</span>
                                            <span>${num2str(card['like_count'])}</span>
                                            <span>
                                                <button class="btn btn-like" aria-label="like" onclick="likeClick(), 'like'"><i class="${class_like} icon-heart"></i></button>
                                            </span>
                                        </div>
                            <!--            image-->
                                        <img src="${card['image']}"
                                             alt="card-image" class="card-img">
                                        <div class="card-desc">
                                            <div class="pet-desc">
                                                <p>제 이름은 ${card['pet_name']} 에요!</p>
                                                <p>나이는 ${card['pet_age']}살 이구요,</p>
                                                <p>${card['pet_species']} 랍니다!</p>
                                            </div>
                                            <p class="pet-intro">${card['pet_intro']}</p>
                                            <p>${time_before}</p>
                                        </div>
                                    </div>`
                    $("#card-box").append(temp_html)
                }
            }
        }
    });
}

// Modal JS
const body = document.querySelector('body')
const modal = document.querySelector('#modal');
const btnPost = document.querySelector('.btn-post');
const btnModalClose = document.querySelector('.modal-close')

btnPost.addEventListener('click', () => {
    modal.style.display = 'block';
    body.style.overflow = 'hidden';
});

btnModalClose.addEventListener('click', () => {
    modal.style.display = 'none';
    body.style.overflow = 'auto';
});

// Scroll
let didScroll;
let lastScrollTop = 0;
let delta = 5;
let navBarHeight = $('.header').outerHeight();

$(window).scroll(function (event) {
    didScroll = true;
});

setInterval(function () {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    let status = $(this).scrollTop();
    if (Math.abs(lastScrollTop - status) <= delta)
        return;

    if (status > lastScrollTop && status > navBarHeight) {
        $('.header').removeClass('nav-down').addClass('nav-up');
    } else {
        if (status + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }
    lastScrollTop = status;
}