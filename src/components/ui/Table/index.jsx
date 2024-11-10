import { Empty } from "antd";
import React from "react";
import { twMerge } from "tailwind-merge";

const TableV1 = ({ columns = [], dataSource = [], isLoading }) => {
  return (
    <div className="table-responsive relative">
      <table className="table whitespace-nowrap min-w-full w-full text-center text-base ">
        <thead className="bg-[#FAFAFA]">
          <tr className="border-b border-defaultborder">
            {columns.map((item, key) => {
              return (
                <th
                  key={key}
                  scope="col"
                  className={twMerge("!text-center", item?.className)}
                >
                  {item.title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(dataSource) &&
            dataSource.length > 0 &&
            dataSource.map((item, key) => {
              return (
                <tr key={key} className="border-b border-defaultborder">
                  {columns.map((columnItem, columnKey) => {
                    return (
                      <td
                        key={columnKey}
                        scope="row"
                        className={twMerge(
                          "!text-center",
                          columnItem?.className
                        )}
                      >
                        {columnItem?.render
                          ? columnItem.render(item?.[columnItem.value], item)
                          : item?.[columnItem.value]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      {(!dataSource || !dataSource?.length) && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Trống" />
      )}
      {/* {isLoading && (
        <div className="absolute top-0 left-0 h-full w-full ">
          <div className="absolute top-[40px] left-1/2 -translate-x-1/2 ">
            <div
              className="ti-spinner !bg-black dark:!bg-light !animate-ping !border-transparent "
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default TableV1;
