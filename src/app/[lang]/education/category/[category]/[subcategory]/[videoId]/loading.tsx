import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex w-full" dir="rtl">
      <section
        className="
          w-full relative
          mt-[60px] lg:mt-0 lg:pt-0
          bg-bg-primary
          xl:px-8 lg:px-8 md:px-5 sm:px-5 xs:px-1
        "
      >
        <section
          className="
            w-full relative
            overflow-y-auto
            overflow-x-clip
            flex flex-col
            justify-start
            items-center
          "
        >
          <div
            className="
              w-full
              bg-bg-primary
              grid grid-cols-12
              xs:flex xs:flex-col
              3xl:flex
              select-none
              mt-10
              rounded-[20px]
            "
          >
            {/* =====================================================
                MAIN CONTENT
            ===================================================== */}

            <div
              className="
                w-auto
                3xl:w-[79%]
                xl:max-h-fit
                lg:max-h-fit
                md:h-full
                sm:h-full
                xs:h-full
                xl:me-10
                lg:me-5
                xs:me-1
                xl:col-span-9
                lg:col-span-9
                sm:col-span-12
                h-fit
                flex flex-col
                justify-start
                items-center
                bg-gray-1
                rounded-[20px]
                p-5
              "
            >
              {/* =====================================================
                  VIDEO SLUG / TITLE
              ===================================================== */}

              <div className="w-full px-2 mb-5">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-5 w-[65%] rounded-md" />
                  <Skeleton className="h-4 w-[35%] rounded-md" />
                </div>
              </div>

              {/* =====================================================
                  VIDEO PLAYER
                  
                  مهم برای LCP:
                  ابعاد Player ثابت است تا CLS نداشته باشیم.
                  هیچ Image یا resource خارجی استفاده نشده.
              ===================================================== */}

              <div
                className="
                  relative
                  w-full
                  aspect-video
                  rounded-[20px]
                  overflow-hidden
                  bg-[#e5e5e5]
                  dark:bg-[#252525]
                "
              >
                <Skeleton className="absolute inset-0 w-full h-full rounded-[20px]" />

                {/* Play button placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Skeleton className="w-[64px] h-[64px] rounded-full" />
                </div>
              </div>

              {/* =====================================================
                  VIDEO DASHBOARD
              ===================================================== */}

              <div className="w-full mt-5 flex flex-col gap-5">

                {/* Title */}

                <div className="flex flex-col gap-2">
                  <Skeleton className="h-6 w-[75%] rounded-md" />
                  <Skeleton className="h-4 w-[40%] rounded-md" />
                </div>

                {/* Actions */}

                <div className="w-full flex flex-row justify-between items-center">

                  <div className="flex flex-row items-center gap-3">

                    <Skeleton className="w-[42px] h-[42px] rounded-full" />

                    <Skeleton className="w-[42px] h-[42px] rounded-full" />

                    <Skeleton className="w-[42px] h-[42px] rounded-full" />

                    <Skeleton className="w-[42px] h-[42px] rounded-full" />

                  </div>

                  <Skeleton className="w-[90px] h-5 rounded-md" />

                </div>
              </div>

              {/* =====================================================
                  PROFILE
              ===================================================== */}

              <div
                className="
                  w-full
                  mt-6
                  pt-5
                  border-t
                  border-[#D9D9D9]
                  dark:border-[#434343]
                  flex
                  flex-row
                  justify-between
                  items-center
                "
              >
                <div className="flex flex-row items-center gap-3">

                  <Skeleton className="w-[55px] h-[55px] rounded-full" />

                  <div className="flex flex-col gap-2">

                    <Skeleton className="w-[120px] h-4 rounded-md" />

                    <Skeleton className="w-[80px] h-3 rounded-md" />

                  </div>

                </div>

                <Skeleton className="w-[120px] h-[40px] rounded-[10px]" />
              </div>

              {/* =====================================================
                  DESCRIPTION
              ===================================================== */}

              <div className="w-full mt-7 flex flex-col gap-3">

                <Skeleton className="w-[25%] h-5 rounded-md" />

                <Skeleton className="w-full h-3 rounded-md" />

                <Skeleton className="w-full h-3 rounded-md" />

                <Skeleton className="w-[92%] h-3 rounded-md" />

                <Skeleton className="w-[75%] h-3 rounded-md" />

              </div>

              {/* =====================================================
                  COMMENTS
              ===================================================== */}

              <div className="w-full mt-10 flex flex-col gap-5">

                <Skeleton className="w-[130px] h-6 rounded-md" />

                {/* Comment input */}

                <div className="w-full flex items-center gap-3">

                  <Skeleton className="w-[42px] h-[42px] rounded-full" />

                  <Skeleton className="flex-1 h-[48px] rounded-[10px]" />

                </div>

                {/* Comments */}

                <div className="w-full flex flex-col gap-4">

                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="w-full flex items-start gap-3"
                    >
                      <Skeleton className="w-[42px] h-[42px] rounded-full shrink-0" />

                      <div className="flex-1 flex flex-col gap-2">

                        <Skeleton className="w-[120px] h-4 rounded-md" />

                        <Skeleton className="w-full h-3 rounded-md" />

                        <Skeleton className="w-[70%] h-3 rounded-md" />

                      </div>
                    </div>
                  ))}

                </div>
              </div>

              {/* =====================================================
                  MOBILE RELATED VIDEOS
              ===================================================== */}

              <div
                className="
                  xl:hidden
                  lg:hidden
                  md:block
                  sm:block
                  xs:block
                  h-fit
                  w-full
                  lg:mx-5
                  md:mx-2
                  xs:mx-1
                  bg-white
                  dark:bg-dark-background
                  mt-10
                  rounded-[20px]
                  p-5
                "
              >
                <Skeleton className="w-[150px] h-6 rounded-md mb-6" />

                <div className="flex flex-col gap-5">

                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex gap-3 w-full"
                    >
                      <Skeleton
                        className="
                          w-[120px]
                          h-[75px]
                          shrink-0
                          rounded-[8px]
                        "
                      />

                      <div className="flex-1 flex flex-col gap-2">

                        <Skeleton className="w-full h-4 rounded-md" />

                        <Skeleton className="w-[75%] h-3 rounded-md" />

                        <Skeleton className="w-[50%] h-3 rounded-md" />

                      </div>
                    </div>
                  ))}

                </div>
              </div>
            </div>

{/* =====================================================
    DESKTOP SIDEBAR
===================================================== */}

<div
  className="
    bg-white
    max-h-[2050px]
    dark:bg-dark-background
    xl:block
    lg:block
    md:hidden
    xs:hidden
    sm:hidden
    3xl:w-[21%]
    no-scrollbar
    overflow-y-hidden
    overflow-x-clip
    xl:col-span-3
    lg:col-span-3
    rounded-[20px]
    mt-14
    lg:mt-0
    p-5
  "
>
  {/* عنوان Sidebar */}
  <Skeleton className="w-[55%] h-6 rounded-md mb-7" />

  <div className="w-full flex flex-col">

    {Array.from({ length: 8 }).map((_, index) => (
      <div
        key={index}
        className="
          w-full
          h-fit
          flex
          flex-col
          gap-5
          pt-2
          justify-start
          items-center
        "
      >

        {/* =========================================
            Creator + Video Title
        ========================================= */}

        <div className="w-[90%] flex flex-row justify-between gap-3 items-center">

          {/* Creator Image */}
          <Skeleton
            className="
              w-[50px]
              h-[50px]
              shrink-0
              rounded-full
            "
          />

          {/* Video Title */}
          <div className="w-full flex flex-col gap-2">

            <Skeleton
              className="
                w-[90%]
                h-4
                rounded-md
              "
            />

            <Skeleton
              className="
                w-[60%]
                h-4
                rounded-md
              "
            />

          </div>

        </div>

        {/* =========================================
            Creator Name + Like
        ========================================= */}

        <div
          className="
            w-[90%]
            flex
            flex-row
            justify-between
            items-center
          "
        >

          {/* Creator */}
          <div
            className="
              w-full
              flex
              items-center
              gap-1
            "
          >
            <Skeleton
              className="
                w-[70px]
                h-4
                rounded-md
              "
            />

            <Skeleton
              className="
                w-[75px]
                h-4
                rounded-md
              "
            />
          </div>

          {/* Like */}
          <div
            className="
              flex
              flex-row
              justify-center
              items-center
              gap-1
            "
          >
            <Skeleton
              className="
                w-[35px]
                h-4
                rounded-md
              "
            />

            <Skeleton
              className="
                w-[26px]
                h-[26px]
                rounded-full
              "
            />
          </div>

        </div>

        {/* =========================================
            Divider
        ========================================= */}

        <div
          className="
            h-[2px]
            w-[90%]
            bg-singleVideo-backgroundInput
            dark:bg-dark-background
          "
        />

      </div>
    ))}

  </div>
</div>
          </div>
        </section>
      </section>
    </div>
  );
}