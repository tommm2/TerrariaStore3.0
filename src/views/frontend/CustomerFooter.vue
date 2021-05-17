<template>
    <div>
       <div class="main-footer container pt-5">
           <div class="row">
            <section class="Logo col-lg-4 col-sm-12 text-lg-left text-sm-center mb-sm-5">
                <h5 class="text-light">輸入EMAIL取得最新資訊</h5>
                <div class="group mb-sm-4">
                    <input type="text" placeholder="xxx@xxx.xxx">
                    <button type="button" class="btn"><i class="fas fa-arrow-right"></i></button>
                </div>
                <img width="200" src="@/assets/image/Logo.png" alt="Logo">
            </section>
            <section class="ContactAndAdress col-lg-4 col-sm-12 text-lg-left text-sm-center mb-sm-5">
                <h5 class="text-light">追蹤我們</h5>
                <div class="followUs mb-5">
                    <a href="#"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-facebook-square"></i></a>
                    <a href="#"><i class="fab fa-twitter-square"></i></a>
                </div>
                <h5 class="text-light">聯絡我們</h5>
                <div class="contactUs">
                    <p><a href="#">地址: 泰拉市蘑菇路一段36巷65號</a></p>
                    <p><a href="#">電話: 0978564231</a></p>
                </div>
            </section>
            <section class="tag col-lg-4 col-sm-12 text-sm-center">
                <ul class="tag-list">
                    <li><router-link :to="{name:'CustomerHome'}">首頁</router-link></li>
                    <li><router-link :to="{name:'CustomerProduct'}">所有商品</router-link></li>
                    <li><router-link :to="{name:'CustomerCart'}">購物車</router-link></li>
                    <li><router-link :to="{name:'Login'}">管理</router-link></li>
                </ul>
            </section>
           </div>
        </div>
        <div class="child-footer p-3 bg-dark text-white text-center">
            <span>&copy;Tomm2 圖片來源皆來自網路，僅當作練習作品</span>
        </div>
    </div>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
    ul{
        li{
            margin-bottom: 30px;
            a{
                font-size:25px;
                font-weight: 1000;
            }
        }
    }
    h5{
        font-size: 25px;
        font-weight: bolder;
    }
    a{
            font-size: 20px;
            color:gray;
            margin-right: 10px;
            transition: color .3s ease;
            font-weight: bolder;
            &:hover{
                color:#8fc866;
                text-decoration: none;
            }
        }
    .Logo{
        input{
            padding: 5px;
            width: 230px;
            border: 2px solid #8fc866;
            outline: none;
        }
        button{
            color:gray;
            &:hover{
                color: #8fc866;
            }
        }
    }
</style>
