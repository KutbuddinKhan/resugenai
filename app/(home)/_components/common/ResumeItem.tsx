import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import React, { FC, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { Dot, EllipsisVertical, FileText, Globe2, Lock } from 'lucide-react';

interface PropType {
  documentId: string;
  title: string;
  status: "archived" | "private" | "public";
  themeColor: string | null;
  thumbnail: string | null;
  updatedAt: string;
}

const ResumeItem: FC<PropType> = ({
  documentId,
  status,
  title,
  themeColor,
  thumbnail,
  updatedAt,
}) => {
  const router = useRouter();

  const docDate = useMemo(() => {
    if (!updatedAt) return null;
    return format(new Date(updatedAt), "dd/MM/yyyy");
  }, [updatedAt]);

  const gotoDoc = useCallback(() => {
    router.push(`/dashboard/document/${documentId}/edit`);
  }, [router, documentId]);

  return (
    <div
      role='button'
      className='cursor-pointer w-full rounded-xl transition-all h-[220px] hover:shadow-lg hover:-translate-y-1 shadow-md overflow-hidden'
      onClick={gotoDoc}
      style={{ borderColor: themeColor || "#e0e0e0" }}
    >
      {/* Thumbnail Section */}
      <div className='w-full h-[120px] relative bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800'>
        {thumbnail ? (
          <Image
            fill
            src={thumbnail}
            alt={title}
            className='object-cover object-top w-full h-full'
          />
        ) : (
          <div className='flex items-center justify-center h-full'>
            <FileText size="40px" className='text-gray-400' />
          </div>
        )}
      </div>

      {/* Body Section */}
      <div className='p-3 bg-white dark:bg-gray-800'>
        {/* Title and Menu Button */}
        <div className='flex items-center justify-between mb-2'>
          <h5 className='font-semibold text-sm text-gray-800 dark:text-gray-200 truncate w-[150px]'>
            {title}
          </h5>
          <button className='text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'>
            <EllipsisVertical size="20px" />
          </button>
        </div>

        {/* Status and Date */}
        <div className='flex items-center text-xs text-gray-500 dark:text-gray-400 gap-2'>
          {status === "private" ? (
            <span className='flex items-center gap-1'>
              <Lock size="12px" />
              <span>Private</span>
            </span>
          ) : (
            <span className='flex items-center gap-1 text-primary'>
              <Globe2 size="12px" />
              <span>Public</span>
            </span>
          )}
          <Dot size="15px" />
          <span>{docDate}</span>
        </div>
      </div>
    </div>
  );
};

export default ResumeItem;