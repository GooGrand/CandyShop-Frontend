<template>
  <div class="text-14px text-center">
    <section class="relative mb-[42px] lg:mb-[140px] overflow-hidden">
      <img
        src="~/assets/img/landing/hero-bg.png"
        alt=""
        class="
          hidden
          lg:block
          absolute
          left-[50%]
          top-[-37px]
          translate-x-[-50%]
          max-w-none
        "
      />

      <div class="container relative">
        <h1 class="invisible absolute">Candy Shop</h1>
        <img
          src="~/assets/img/landing/1.png"
          alt="Candy Shop"
          class="mx-auto mb-[11px] w-[100%] max-w-[849px] lg:mb[19px]"
        />

        <p
          class="
            mb-[43px]
            lg:mb-[65px]
            text-center text-lg
            leading-[22px]
            lg:text-[27px] lg:leading-[37px] lg:font-bold
          "
        >
          Buy LP tokens like candies. Enjoy the sweet compounding yield.<br />
          One-click platform for multichain liquidity provision
        </p>

        <buttons-group />
      </div>
    </section>

    <section class="mb-[42px] lg:mb-[140px]">
      <div class="container">
        <h2
          class="
            mb-[14px]
            text-[#FFF500] text-[40px]
            font-heading
            leading-[40px]
            lg:mb-[43px] lg:text-[84px] lg:leading-[77px]
          "
        >
          Start LP farming<br />in one bite
        </h2>

        <p
          class="
            mx-auto
            mb-[26px]
            text-sm
            leading-[18px]
            md:max-w-[732px]
            lg:mb-[42px] lg:text-lg lg:leading-[24px]
          "
        >
          Liquidity provision becomes unbelievably simple with <b>Candyshop</b>:
          buy LP tokens, farm and leverage DEXs – all in one place within a
          couple of clicks. By buying a Candie you entrust LP management to
          Candishop which will combine all possible yield sources for the most
          beneficial passive income.
        </p>

        <ul
          class="
            flex flex-col
            items-center
            mx-auto
            mb-[43px]
            md:max-w-[870px] md:flex-row md:items-start md:justify-between
            lg:mb-[55px]
          "
        >
          <li class="max-w-[270px] md:max-w-[222px]">
            <h3
              class="
                mb-[12px]
                text-[20px]
                leading-[30px]
                font-bold
                lg:mb-[26px] lg:text-[24px] lg-leading-[30px]
              "
            >
              Farm
            </h3>
            <img
              src="~/assets/img/landing/2-1.png"
              alt="Candy Shop"
              class="mx-auto mb-[13px] lg:mb-[20px] w-[178px] h-[185px]"
            />
            <p class="text-[15px] leading-[19px] font-semibold lg:font-bold">
              Farm GTON from the LP tokens in the Graviton app across a variety
              of chains
            </p>
          </li>
          <li class="mt-[28px] max-w-[270px] md:max-w-[222px] md:mt-0">
            <h3
              class="
                mb-[12px]
                text-[20px]
                leading-[30px]
                font-bold
                lg:mb-[26px] lg:text-[24px] lg-leading-[30px]
              "
            >
              Leverage fees
            </h3>
            <img
              src="~/assets/img/landing/2-2.png"
              alt="Candy Shop"
              class="mx-auto mb-[13px] lg:mb-[20px] w-[178px] h-[185px]"
            />
            <p class="text-[15px] leading-[19px] font-semibold lg:font-bold">
              Get a portion of the DEX pool’s transaction fees
            </p>
          </li>
          <li class="mt-[28px] max-w-[270px] md:max-w-[222px] md:mt-0">
            <h3
              class="
                mb-[12px]
                text-[20px]
                leading-[30px]
                font-bold
                lg:mb-[26px] lg:text-[24px] lg-leading-[30px]
              "
            >
              Exchange
            </h3>
            <img
              src="~/assets/img/landing/2-3.png"
              alt="Candy Shop"
              class="mx-auto mb-[13px] lg:mb-[20px] w-[178px] h-[185px]"
            />
            <p class="text-[15px] leading-[19px] font-semibold lg:font-bold">
              Leverage the LP tokens’ price fluctuations
            </p>
          </li>
        </ul>

        <buttons-group />
      </div>
    </section>

    <section class="mb-[42px] lg:mb-[140px]">
      <div class="container">
        <h2
          class="
            mb-[14px]
            text-[#FFF500] text-[40px]
            font-heading
            leading-[40px]
            lg:mb-[43px] lg:text-[84px] lg:leading-[77px]
          "
        >
          Liquidity mining<br />is a snap
        </h2>

        <p
          class="
            mx-auto
            mb-[26px]
            text-lg
            leading-[24px]
            md:max-w-[732px]
            lg:mb-[42px] lg:text-lg lg:leading-[24px]
          "
        >
          Three simple steps to get the most out of liquidity provision on any
          DEX of your taste.
        </p>

        <ul
          class="
            flex flex-col
            items-center
            mx-auto
            mb-[43px]
            md:max-w-[870px] md:flex-row md:items-stretch md:justify-between
            lg:mb-[55px]
          "
        >
          <li class="flex flex-col max-w-[255px]">
            <h3
              class="
                mb-[8px]
                text-[20px]
                leading-[30px]
                font-bold
                lg:mb-[15px] lg:text-[24px] lg-leading-[30px]
              "
            >
              Buy a Candy (LP token)
            </h3>
            <div
              class="
                order-1
                md:order-none
                flex
                items-end
                md:mb-[23px] md:h-[200px]
              "
            >
              <img
                src="~/assets/img/landing/3-1.svg"
                alt="Candy Shop"
                class="mx-auto w-[110px] h-[133px] md:w-[166px] md:h-[200px]"
              />
            </div>
            <p
              class="
                mb-[16px]
                md:mb-0
                text-[15px]
                leading-[19px]
                font-semibold
                md:max-w-[222px] md:font-bold
              "
            >
              with a stablecoin or any native token
            </p>
          </li>
          <li class="flex flex-col mt-[22px] max-w-[255px] md:mt-0">
            <h3
              class="
                mb-[8px]
                text-[20px]
                leading-[30px]
                font-bold
                lg:mb-[15px] lg:text-[24px] lg-leading-[30px]
              "
            >
              Stake it at Candyshop
            </h3>
            <div
              class="
                order-1
                md:order-none
                flex
                items-end
                md:mb-[23px] md:h-[200px]
              "
            >
              <img
                src="~/assets/img/landing/3-2.svg"
                alt="Candy Shop"
                class="mx-auto w-[74px] h-[114px] md:w-[129px] md:h-[197px]"
              />
            </div>
            <p
              class="
                mb-[16px]
                md:mb-0
                text-[15px]
                leading-[19px]
                font-semibold
                md:max-w-[222px] md:font-bold
              "
            >
              and withdraw to the wallet at any time
            </p>
          </li>
          <li class="flex flex-col mt-[22px] max-w-[255px] md:mt-0">
            <h3
              class="
                mb-[8px]
                text-[20px]
                leading-[30px]
                font-bold
                lg:mb-[15px] lg:text-[24px] lg-leading-[30px]
              "
            >
              Earn rewards
            </h3>
            <div
              class="
                order-1
                md:order-none
                flex
                items-end
                md:mb-[23px] md:h-[200px]
              "
            >
              <img
                src="~/assets/img/landing/3-3.png"
                alt="Candy Shop"
                class="mx-auto w-[114px] h-[164px] md:w-[115px] md:h-[165px]"
              />
            </div>
            <p
              class="
                mb-[16px]
                md:mb-0
                text-[15px]
                leading-[19px]
                font-semibold
                md:max-w-[222px] md:font-bold
              "
            >
              by simply holding your Candies in the Candyshop bag
            </p>
          </li>
        </ul>

        <buttons-group />
      </div>
    </section>

    <section>
      <div class="container">
        <h2
          class="
            mb-[42px]
            text-[#FFF500] text-[40px]
            font-heading
            leading-[40px]
            lg:mb-[110px] lg:text-[84px] lg:leading-[77px]
          "
        >
          $CANDY token
        </h2>

        <ul
          class="
            flex flex-col
            items-center
            mx-auto
            mb-[43px]
            md:max-w-[870px] md:flex-row md:items-start md:justify-between
            lg:mb-[77px]
          "
        >
          <li class="max-w-[266px] md:max-w-[222px]">
            <span
              class="
                block
                mb-[24px]
                text-[#FFF500] text-[168px]
                leading-[115px]
                md:leading-[155px]
                font-heading
                md:mb-[14px]
              "
            >
              1
            </span>
            <p
              class="
                mb-[8px]
                text-[#FFF500] text-[24px]
                font-bold
                leading-[30px]
                md:mb-[15px]
              "
            >
              Launch in Q4 2021
            </p>
            <p class="text-[15px] font-bold leading-[19px]">
              Used as a governance token
            </p>
          </li>
          <li class="mt-[42px] max-w-[266px] md:max-w-[222px] md:mt-0">
            <span
              class="
                block
                mb-[24px]
                text-[#FFF500] text-[168px]
                leading-[115px]
                md:leading-[155px]
                font-heading
                md:mb-[14px]
              "
            >
              2
            </span>
            <p
              class="
                mb-[8px]
                text-[#FFF500] text-[24px]
                font-bold
                leading-[30px]
                md:mb-[15px]
              "
            >
              Multichain
            </p>
            <p class="text-[15px] font-bold leading-[19px]">
              ported to 7 chains at launch
            </p>
          </li>
          <li class="mt-[42px] max-w-[266px] md:max-w-[222px] md:mt-0">
            <span
              class="
                block
                mb-[24px]
                text-[#FFF500] text-[168px]
                leading-[115px]
                md:leading-[155px]
                font-heading
                md:mb-[14px]
              "
            >
              3
            </span>
            <p
              class="
                mb-[8px]
                text-[#FFF500] text-[24px]
                font-bold
                leading-[30px]
                md:mb-[15px]
              "
            >
              Liquidity-boosted
            </p>
            <p class="text-[15px] font-bold leading-[19px]">
              paired to GTON across all established chains and most popular DEXs
            </p>
          </li>
        </ul>

        <buttons-group />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ButtonsGroup from '~/components/Landing/ButtonsGroup.vue'

export default Vue.extend({
  components: { ButtonsGroup },
  layout: 'landing',
})
</script>
