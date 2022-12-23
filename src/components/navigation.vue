<template>
    <vue-navigation-bar :options="navbarOptions" />
</template>

<script>
import VueNavigationBar from "vue-navigation-bar";
import "vue-navigation-bar/dist/vue-navigation-bar.css";

export default {
    components: { VueNavigationBar },
    data() {
        let menuOptionsRight = [
            {
                type: "button",
                text: "Logout",
                path: { name: "logout" },
                iconRight:
                    '<svg id="i-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"> <path d="M22 6 L30 16 22 26 M30 16 L2 16" /> </svg>',
            },
        ];

        // check whether login as guest
        let email = localStorage.getItem("username");
        if (!email || email == "anonymous@anonymous.com") {
            menuOptionsRight = [
                {
                    type: "button",
                    text: "Signup",
                    path: { name: "register" },
                    class: "button-red",
                },
                {
                    type: "button",
                    text: "Login",
                    path: { name: "login" },
                    iconRight:
                        '<svg id="i-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"> <path d="M22 6 L30 16 22 26 M30 16 L2 16" /> </svg>',
                },
            ];
        }

        return {
            navbarOptions: {
                elementId: "main-navbar",
                isUsingVueRouter: true,
                mobileBreakpoint: 992,
                brandImagePath: "index",
                brandImage: require("../../assets/images/logo.png"),
                brandImageAltText: "brand-image",
                collapseButtonOpenColor: "#661c23",
                collapseButtonCloseColor: "#661c23",
                showBrandImageInMobilePopup: true,
                ariaLabelMainNav: "Main Navigation",
                tooltipAnimationType: "shift-away",
                tooltipPlacement: "bottom",
                // TODO: modify these left options
                menuOptionsLeft: [
                    {
                        type: "link",
                        text: "Why Blockly Games",
                        arrowColor: "#659CC8",
                        subMenuOptions: [
                            {
                                isLinkAction: true,
                                type: "link",
                                text: "About",
                                subText:
                                    "Stupid corporate wet blankets. Like booze ever killed anyone.",
                                path: { name: "about" },
                            },
                            {
                                type: "spacer",
                            },
                            {
                                type: "link",
                                text: "GitHub",
                                subText:
                                    "Stupid corporate wet blankets. Like booze ever killed anyone.",
                                path: { name: "about" },
                            },
                        ],
                    },
                    {
                        type: "link",
                        text: "Contact",
                        subMenuOptions: [
                            {
                                type: "link",
                                text: "index",
                                path: { name: "about" },
                                subText: "niezili22@mails.ucas.ac.cn",
                                iconLeft:
                                    '<svg width="45" height="45" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44 24V9H24H4V24V39H24" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><path d="M31 36L36 40L44 30" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 9L24 24L44 9" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                            },
                        ],
                    },
                    {
                        type: "link",
                        text: "Time-Rank",
                        path: { name: "rank" },
                        iconRight: '<i class="fa fa-long-arrow-right fa-fw"></i>',
                    },
                ],
                menuOptionsRight: menuOptionsRight,
            },
        };
    },
};
</script>

<style lang="scss">
.vnb {
    .button-red {
        background: #ff3b30;

        &:hover {
            background: darken(#ff3b30, 10%);
        }
    }
}
</style>
