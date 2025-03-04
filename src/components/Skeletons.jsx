import { Skeleton } from "@mui/material";

export const PlayerSkeletonDesktop = () => (
  <div className="fixed bottom-0 bg-white px-20 py-5 border-t-2 border-black right-0 left-0 flex items-center justify-center">
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center animate-pulse">
        {/* Thumbnail and Title Section */}
        <div className="flex items-center gap-4 flex-1">
          <Skeleton
            animation="pulse"
            variant="rectangular"
            width={80}
            height={80}
          />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton
              animation="pulse"
              variant="text"
              width={200}
              height={24}
            />
            <Skeleton
              animation="pulse"
              variant="text"
              width={150}
              height={20}
            />
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="flex-1 flex items-center gap-4 w-full">
          <Skeleton animation="pulse" variant="text" width={70} height={20} />
          <div className="h-3 w-full relative">
            <Skeleton
              animation="pulse"
              variant="rectangular"
              height={4}
              className="w-full"
            />
            <Skeleton
              animation="pulse"
              variant="rectangular"
              height={12}
              width={40}
              className="absolute top-[-4px] left-1/4"
              sx={{ borderRadius: "6px" }}
            />
          </div>
          <Skeleton animation="pulse" variant="text" width={70} height={20} />
        </div>

        {/* Controls Section */}
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <Skeleton
              animation="pulse"
              variant="circular"
              width={40}
              height={40}
            />
            <Skeleton
              animation="pulse"
              variant="rectangular"
              width={80}
              height={32}
            />
          </div>
          <div className="flex gap-3 items-center">
            <Skeleton
              animation="pulse"
              variant="circular"
              width={40}
              height={40}
            />
            <Skeleton
              animation="pulse"
              variant="circular"
              width={45}
              height={45}
            />
            <Skeleton
              animation="pulse"
              variant="circular"
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);
export const PlayerSkeletonMobile = () => (
  <>
    <div className="w-full h-1 bg-neutral-200 rounded-xl">
      <div className="h-full w-full bg-neutral-300 rounded-s-xl"></div>
    </div>

    <div className="flex flex-row justify-evenly items-center px-3 gap-4">
      {/* Thumbnail Skeleton */}
      <div className="w-[50px] h-[50px] rounded-lg bg-neutral-200" />

      {/* Text Skeleton */}
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-4 bg-neutral-200 rounded w-3/4" />
        <div className="h-3 bg-neutral-200 rounded w-1/2" />
      </div>

      {/* Play Button Skeleton */}
      <div className="w-[30px] h-[30px] rounded-full bg-neutral-200" />
    </div>
  </>
);
