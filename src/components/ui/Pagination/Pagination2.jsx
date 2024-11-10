import { ConfigProvider, Pagination } from "antd";
import { Link, useSearchParams } from "react-router-dom";

import React from "react";
import useQuery from "@/hooks/useQuery";

const PaginationV2 = ({
  total,
  pageSizeOptions = [],
  showSizeChanger = false,
  props,
  setProps,
}) => {
  const { controlPagination } = useQuery();
  const onPaginationChange = (page) => {
    setProps((prevData) => ({
      ...prevData,
      page: page,
    }));
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            borderRadius: "100%",
            colorPrimaryHover: null,
            colorBorderBg: "#845ADF",
            colorPrimary: "white",
            itemActiveBg: "#845ADF",
          },
        },
      }}
    >
      {!!total && (
        <Pagination
          current={props?.page || 1}
          pageSize={props?.limit || 10}
          total={total}
          className="!mt-4 justify-end"
          showSizeChanger={false}
          onChange={onPaginationChange}
        />
      )}
    </ConfigProvider>
  );
};

export default PaginationV2;
