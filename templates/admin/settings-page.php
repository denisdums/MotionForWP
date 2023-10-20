<section id="motion-for-wp-wrapper">
    <div class="max-w-5xl bg-white rounded-lg my-8 mx-auto w-full shadow-lg  overflow-hidden">
        <div class="flex flex-col gap-6 p-4 pb-10">
            <div class="w-full rounded-md overflow-hidden">
                <img src="<?= \MotionForWP\Image::getUrl('motion-banner.svg') ?>"
                     class="w-full block"
                     alt="motion for wp banner">
            </div>
            <div class="flex flex-col gap-10">
                <div class="max-w-xl mx-auto p-6 bg-gray-100 rounded flex flex-col gap-1">
                    <h2 class="text-lg font-semibold">
                        <?= __('Settings', MOTION_FOR_WP_TEXT_DOMAIN) ?>
                    </h2>
                    <p><?= __('You can set the default parameters of your animations here.', MOTION_FOR_WP_TEXT_DOMAIN) ?></p>
                </div>
                <div class="max-w-3xl mx-auto">
                    <?php do_action($data->settingPage->id . '_before_form'); ?>
                    <form action="options.php" method="post">
                        <?php
                        do_action($data->settingPage->id . '_before_options');
                        settings_fields($data->settingPage->id);
                        ?>
                        <div class="grid grid-cols-12 gap-4 mb-8">
                            <?php
                            \MotionForWP\Helpers\SettingsSection::renderSectionsByPage($data->settingPage->id);
                            ?>
                        </div>
                        <?php
                        do_action($data->settingPage->id . '_before_submit_button');
                        ?>
                        <button class="bg-secondary border-none py-2 px-3 rounded font-semibold cursor-pointer
                        hover:bg-secondary-tone focus:bg-secondary-tone transition-all">
                            <?= __('Save Settings', MOTION_FOR_WP_TEXT_DOMAIN) ?>
                        </button>
                        <?php
                        do_action($data->settingPage->id . '_after_submit_button');
                        ?>
                    </form>
                    <?php do_action($data->settingPage->id . '_after_form'); ?>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-5xl mx-auto bg-black p-8 rounded-lg text-white flex flex-col
    gap-y-10">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-5">
            <div>
                <svg width="44" height="40" viewBox="0 0 44 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                     class="w-16 h-16 object-contain svg-white">
                    <g clip-path="url(#clip0_108_36)">
                        <path
                            d="M38.4184 21.7782C37.9401 21.7782 37.4689 21.5591 37.1623 21.1438C36.65 20.4495 36.7947 19.4694 37.4888 18.9544C37.5101 18.9388 40.0435 17.0026 40.3046 14.4818C40.4366 13.2143 39.9711 11.9923 38.8839 10.749C37.053 8.65638 32.8477 9.7162 29.6402 10.9752C25.3085 12.6752 20.7427 15.4847 17.7211 17.3441C16.5119 18.0881 15.5553 18.677 14.9123 19.0099C13.5413 19.7212 12.1178 19.8933 10.6786 19.522C7.83442 18.788 5.86731 16.0794 6.00072 13.0792C6.12987 10.1728 7.24826 4.81969 13.2773 1.6317C16.9689 -0.320074 20.9968 -0.526347 24.9239 1.03706C27.8391 2.19789 29.6813 3.9377 29.758 4.01167C30.3825 4.60773 30.4066 5.59784 29.8119 6.22378C29.2172 6.84829 28.2308 6.87389 27.6063 6.27926C27.3466 6.03457 21.6113 0.762507 14.7335 4.40003C10.3139 6.73733 9.24092 10.4858 9.11887 13.22C9.05074 14.7493 10.0329 16.1249 11.455 16.4919C12.1377 16.6683 12.799 16.583 13.476 16.2316C14.0182 15.9514 14.9762 15.361 16.0861 14.6781C22.9894 10.4303 35.8396 2.52081 41.23 8.68626C42.9047 10.6025 43.6371 12.6695 43.4057 14.8304C42.9885 18.7254 39.4928 21.36 39.3452 21.4709C39.0656 21.6786 38.7406 21.7782 38.417 21.7782H38.4184Z"
                            fill="#fff"></path>
                        <path
                            d="M23.4649 40C18.7316 40 15.0287 38.4722 12.4499 35.452C10.3238 32.9639 9.46371 30.0747 8.95135 27.8355C8.14662 24.3189 6.86785 23.2335 6.17809 22.8992C5.48974 22.5663 5.0086 22.7655 5.00293 22.7683C3.58649 23.5707 2.84705 25.255 3.21464 26.8597C3.88596 29.7887 6.02622 30.1984 6.26892 30.2354L6.24621 30.2326L5.86868 33.3395C5.6856 33.3167 1.35539 32.7292 0.171713 27.561C-0.502443 24.6163 0.855804 21.5236 3.47579 20.0398C4.2791 19.5846 5.78069 19.3029 7.36886 20.0057C8.88748 20.6771 10.9241 22.4596 11.9943 27.1385C12.9807 31.4517 15.3083 37.1492 24.1092 36.8618C26.7391 36.775 28.7162 35.9286 30.1567 34.2713C33.3161 30.6366 32.7072 24.4256 32.7001 24.363V24.346C32.3226 20.3329 31.4369 15.4492 30.7159 14.5757C30.1667 13.9099 30.2589 12.9241 30.9232 12.3721C31.5874 11.8202 32.5724 11.9141 33.1216 12.5798C34.8091 14.6241 35.6025 21.8621 35.8069 24.0458C35.8509 24.4754 36.5179 31.7163 32.5113 36.3269C30.4988 38.6429 27.7057 39.8748 24.2114 39.99C23.9602 39.9986 23.7104 40.0028 23.4649 40.0028V40Z"
                            fill="#fff"></path>
                        <path
                            d="M24.3378 25.6903C24.2455 25.6903 24.1816 25.6875 24.1518 25.686C23.4479 25.6462 22.9086 25.0402 22.9497 24.3346C22.9909 23.629 23.5926 23.0898 24.298 23.1297C24.5237 23.1382 25.2858 23.0841 25.679 22.7185C25.7996 22.6062 25.96 22.4027 25.9756 21.9219C25.9926 21.3742 25.8862 21.0043 25.6563 20.8194C25.1751 20.4339 24.0809 20.5534 23.6253 20.6715C22.9455 20.8479 22.2457 20.4424 22.0669 19.761C21.8867 19.0796 22.2869 18.3811 22.9667 18.1976C23.2336 18.125 25.625 17.529 27.2402 18.8107C27.859 19.3015 28.5857 20.2546 28.5289 22.0044C28.4948 23.0628 28.1031 23.9647 27.3977 24.612C26.3276 25.5936 24.87 25.6903 24.3378 25.6903V25.6903Z"
                            fill="#fff"></path>
                        <path
                            d="M24.6499 31.5015C23.0859 31.5015 21.4779 31.0933 19.8627 30.2767C17.44 29.0519 15.859 27.322 15.7923 27.2495C15.3182 26.726 15.3565 25.9165 15.8788 25.4414C16.3997 24.9662 17.2073 25.0046 17.6813 25.5267C17.704 25.5509 19.0651 27.0218 21.0762 28.0233C23.6025 29.2809 25.9784 29.2439 28.1371 27.9124C28.7375 27.5425 29.5252 27.7303 29.8942 28.332C30.2632 28.9338 30.0758 29.7233 29.4755 30.0932C27.9526 31.0321 26.3261 31.5015 24.6485 31.5015H24.6499Z"
                            fill="#fff"></path>
                    </g>
                    <defs>
                        <clipPath id="clip0_108_36">
                            <rect width="43.4483" height="40" fill="white"></rect>
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <nav class="lg:col-span-3">
                <ul class="grid grid-cols-2 gap-5 lg:grid-cols-3">
                    <li class="list-none"><span class="text-lg font-bold">Help</span>
                        <ul class="mt-2">
                            <li class="list-none">
                                <a href="https://denisdums.com/motion-for-wp/"
                                   class="text-white no-underline hover:underline focus:underline">
                                    <?= __('Documentation', MOTION_FOR_WP_TEXT_DOMAIN) ?>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>

    </div>
</section>