// import { getBusinesses } from "@/lib/actions/business";
// import { getFarms } from "@/lib/actions/farm";
// import {
//   getSeedStockByTypeCounts,
//   getSeedStocks,
// } from "@/lib/actions/sceedStock";
// import { getSeedStockCertificationDenialReasons } from "@/lib/actions/seedStockCertification";
// import { getStorageFacilities } from "@/lib/actions/storageFacility";
// import { CertificationStatusOR } from "@/modules/SeedStockModule";
// import { Business, CertificationStatus } from "@prisma/client";
// import { useEffect, useState } from "react";
// import { useMutation } from "react-query";

// export function useGetBusinesses(initialPage: number, initialrow: number) {
//   const [cursor, setCursor] = useState("");
//   const [prevCursor, setPrevCursor] = useState("");
//   const [data, setData] = useState<{
//     [key: string]: {
//       data: Business[];
//       count: number;
//       cursor: string;
//     };
//   }>();
//   const [rowPage, setRowPage] = useState({
//     row: initialrow,
//     page: initialPage,
//   });

//   const key = () => `business-page-${rowPage.page}-row-${rowPage.row}`;

//   const { isLoading, mutate, error } = useMutation({
//     mutationFn: getBusinesses,
//     mutationKey: key(),
//     onSuccess: (newData) => {
//       setData({ ...data, [key()]: newData });
//       setPrevCursor(cursor);
//       setCursor(newData.cursor);
//     },
//   });

//   const changeRowPage = (row: number, page: number) => {
//     setRowPage({ row, page });
//   };

//   useEffect(() => {
//     const { page, row } = rowPage;
//     const requestData = data?.[key()];
//     if (!requestData) {
//       mutate({
//         cursor: page > 0 ? cursor : "",
//         rowSize: row,
//       });
//     } else {
//       setCursor(requestData.cursor);
//     }
//   }, [rowPage]);

//   return {
//     isLoading,
//     changeRowPage,
//     prevCursor,
//     businesses: data?.[key()],
//     error,
//   };
// }

// export function useGetFarms(
//   initialPage: number,
//   initialrow: number,
//   bid?: string
// ) {
//   const [key, _setKey] = useState("");
//   const [prevCursor, setPrevCursor] = useState("");
//   const [cursor, setCursor] = useState("");
//   const [prevPage, setPrevPage] = useState(initialPage);

//   const setKey = (pn: string, rowpp: string) => {
//     _setKey(`farm-page-${pn}-rowpp-${rowpp}}-${bid}`);
//   };

//   const {
//     isLoading,
//     data: farms,
//     mutate,
//     error,
//   } = useMutation({
//     mutationFn: getFarms,
//     mutationKey: key,
//     onSuccess: (data) => {
//       setPrevCursor(cursor);
//       setCursor(data.cursor);
//     },
//   });

//   // const loadBusinesses = (rowSize: number) => {
//   //   mutate({
//   //     cursor,
//   //     rowSize,
//   //     // status: for filtering
//   //   });
//   // };

//   const loadFarmData = (rowSize: number, page: number) => {
//     if (page > prevPage) {
//       setPrevPage(page);
//       // we are loading forward
//       mutate({
//         cursor,
//         rowSize,
//         bid,
//       });
//     } else {
//       if (page < prevPage) setPrevPage(prevPage - page);
//       // we are loading backwards
//       mutate({
//         cursor: prevCursor,
//         rowSize,
//         bid,
//       });
//     }
//   };
//   useEffect(() => {
//     loadFarmData(initialrow, initialPage);
//   }, []);

//   return {
//     isLoading,
//     loadFarmData,
//     farms,
//     setKey,
//     error,
//   };
// }

// export function useGetSeedStock(
//   initialPage: number,
//   initialrow: number,
//   bid?: string
// ) {
//   const [key, _setKey] = useState("");
//   const [prevCursor, setPrevCursor] = useState("");
//   const [cursor, setCursor] = useState("");
//   const [prevPage, setPrevPage] = useState(initialPage);

//   const setKey = (pn: string, rowpp: string) => {
//     _setKey(`seed-stock-${pn}-rowpp-${rowpp}-${bid}`);
//   };

//   const {
//     isLoading,
//     data: seedStocks,
//     mutate,
//     error,
//   } = useMutation({
//     mutationFn: getSeedStocks,
//     mutationKey: key,
//     onSuccess: (data) => {
//       console.log(data);
//       setPrevCursor(cursor);
//       setCursor(data.cursor);
//     },
//   });

//   const loadSeedStockData = (rowSize: number, page: number) => {
//     if (page > prevPage) {
//       setPrevPage(page);
//       // we are loading forward
//       mutate({
//         cursor,
//         rowSize,
//         bid,
//       });
//     } else {
//       if (page < prevPage) setPrevPage(prevPage - page);
//       // we are loading backwards
//       mutate({
//         cursor: prevCursor,
//         rowSize,
//         bid,
//       });
//     }
//   };
//   useEffect(() => {
//     loadSeedStockData(initialrow, initialPage);
//   }, []);

//   return {
//     isLoading,
//     loadSeedStockData,
//     seedStocks,
//     setKey,
//     error,
//   };
// }

// export function useGetStorageFacilities(
//   initialPage: number,
//   initialrow: number,
//   bid?: string
// ) {
//   const [key, _setKey] = useState("");
//   const [prevCursor, setPrevCursor] = useState("");
//   const [cursor, setCursor] = useState("");
//   const [prevPage, setPrevPage] = useState(initialPage);

//   const setKey = (pn: string, rowpp: string) => {
//     _setKey(`storage-facility-page-${pn}-rowpp-${rowpp}}-${bid}`);
//   };

//   const {
//     isLoading,
//     data: storageFacilities,
//     mutate,
//     error,
//   } = useMutation({
//     mutationFn: getStorageFacilities,
//     mutationKey: key,
//     onSuccess: (data) => {
//       console.log(data);
//       setPrevCursor(cursor);
//       setCursor(data.cursor);
//     },
//   });

//   const loadStorageFacilitiesData = (rowSize: number, page: number) => {
//     if (page > prevPage) {
//       setPrevPage(page);
//       // we are loading forward
//       mutate({
//         cursor,
//         rowSize,
//         bid,
//       });
//     } else {
//       if (page < prevPage) setPrevPage(prevPage - page);
//       // we are loading backwards
//       mutate({
//         cursor: prevCursor,
//         rowSize,
//         bid,
//       });
//     }
//   };
//   useEffect(() => {
//     loadStorageFacilitiesData(initialrow, initialPage);
//   }, []);

//   return {
//     isLoading,
//     loadStorageFacilitiesData,
//     storageFacilities,
//     setKey,
//     error,
//   };
// }

// export function useGetCropPaiMetrics(
//   status?: CertificationStatus | CertificationStatusOR,
//   bid?: string
// ) {
//   const [key, _setKey] = useState("");

//   const setKey = (pn: string, rowpp: string) => {
//     _setKey(`storage-facility-page-${pn}-rowpp-${rowpp}}-${bid}`);
//   };

//   const {
//     isLoading,
//     data: seedStockMetrics,
//     mutate,
//     error,
//   } = useMutation({
//     mutationFn: getSeedStockByTypeCounts,
//     mutationKey: key,
//     onSuccess: (data) => {
//       console.log(data);
//     },
//   });

//   const loadSeedStockMetricsData = (
//     status?: CertificationStatus | CertificationStatusOR,
//     bid?: string
//   ) => {
//     // we are loading forward
//     mutate({ status, bid });
//   };

//   useEffect(() => {
//     loadSeedStockMetricsData(undefined, bid);
//   }, [key]);

//   return {
//     isLoading,
//     loadSeedStockMetricsData,
//     seedStockMetrics,
//     setKey,
//     error,
//   };
// }


// export function useGetSeedStockDenialReasons(
//   initialPage: number,
//   initialrow: number,
//   ssid?: string
// ) {

//   const [key, _setKey] = useState("");
//   const [prevCursor, setPrevCursor] = useState("");
//   const [cursor, setCursor] = useState("");
//   const [prevPage, setPrevPage] = useState(initialPage);

//   const setKey = (pn: string, rowpp: string) => {
//     _setKey(
//       `seed-stock-certification-denial-page-${pn}-rowpp-${rowpp}}-${ssid}`
//     );
//   };

//   const {
//     isLoading,
//     data: certificationDenials,
//     mutate,
//     error,
//   } = useMutation({
//     mutationFn: getSeedStockCertificationDenialReasons,
//     mutationKey: key,
//     onSuccess: (data) => {
//       console.log(data);
//       setPrevCursor(cursor);
//       setCursor(data.cursor);
//     },
//   });

//   const loadData = (rowSize: number, page: number) => {
//     if (page > prevPage) {
//       setPrevPage(page);
//       // we are loading forward
//       mutate({
//         cursor,
//         rowSize,
//         ssid,
//       });
//     } else {
//       if (page < prevPage) setPrevPage(prevPage - page);
//       // we are loading backwards
//       mutate({
//         cursor: prevCursor,
//         rowSize,
//         ssid,
//       });
//     }
//   };

//   useEffect(() => {
//     loadData(initialrow, initialPage);
//   }, []);

//   return {
//     isLoading,
//     loadData,
//     certificationDenials,
//     setKey,
//     error,
//   };
// }