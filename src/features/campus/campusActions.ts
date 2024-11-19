
import {loadCampusFailure, loadCampusStart, loadCampusSuccess } from './campusSlice';
import { AppDispatch } from '../../store/store';

// Mock data to be used
const mockCampus = [
    {
        id: "bk",
        name: "2020 UC Berkeley Budget",
        fill: "#fff",
        label: {
            fontColor: "#2a333d",
            fontWeight: "bold"
        }
    },
    {
        id: "cm",
        parent: "bk",
        name: "Campus",
        fill: "#f06362"
    },
    {
        id: "lb",
        parent: "cm",
        name: "Liabilities",
        value: 6608294
    },
    {
        id: "or",
        parent: "cm",
        name: "Operating Revenues",
        value: 2069675
    },
    {
        id: "oe",
        parent: "cm",
        name: "Operating Expenses",
        value: 3229481
    },
    {
        id: "clb",
        parent: "lb",
        name: "Current Liabilities",
        value: 841861
    },
    {
        id: "nclb",
        parent: "lb",
        name: "Noncurrent Liabilities",
        value: 5766433
    },
    {
        id: "ap",
        parent: "clb",
        name: "Accounts payable",
        value: 53010
    },
    {
        id: "as",
        parent: "clb",
        name: "Accrued salaries",
        value: 23554
    },
    {
        id: "ur",
        parent: "clb",
        name: "Unearned revenue",
        value: 253322
    },
    {
        id: "cp",
        parent: "clb",
        name: "Commercial paper",
        value: 326008
    },
    {
        id: "cpld",
        parent: "clb",
        name: "Current portion of long-term debt",
        value: 112431
    },
    {
        id: "fhfo",
        parent: "clb",
        name: "Funds held for others",
        value: 2500
    },
    {
        id: "oclb",
        parent: "clb",
        name: "Other current liabilities",
        value: 71036
    },
    {
        id: "frl",
        parent: "nclb",
        name: "Federal refundable loans",
        value: 14097
    },
    {
        id: "ltd",
        parent: "nclb",
        name: "Long-term debt",
        value: 2056729
    },
    {
        id: "npl",
        parent: "nclb",
        name: "Net pension liability",
        value: 1545394
    },
    {
        id: "ppu",
        parent: "nclb",
        name: "Pension payable to University",
        value: 368399
    },
    {
        id: "nrhbl",
        parent: "nclb",
        name: "Net retiree health benefits liability",
        value: 1706807
    },
    {
        id: "onclb",
        parent: "nclb",
        name: "Other noncurrent liabilities",
        value: 75007
    },
    {
        id: "stf",
        parent: "or",
        name: "Student tuition and fees",
        value: 1011824
    },
    {
        id: "gc",
        parent: "or",
        name: "Grants and contracts",
        value: 677411
    },
    {
        id: "ea",
        parent: "or",
        name: "Educational activities",
        value: 76553
    },
    {
        id: "ae",
        parent: "or",
        name: "Auxiliary enterprises",
        value: 186815
    },
    {
        id: "oor",
        parent: "or",
        name: "Other operating revenues",
        value: 117072
    },
    {
        id: "sw",
        parent: "oe",
        name: "Salaries and wages",
        value: 1388250
    },
    {
        id: "pb",
        parent: "oe",
        name: "Pension benefits",
        value: 375669
    },
    {
        id: "rhb",
        parent: "oe",
        name: "Retiree health benefits",
        value: 61488
    },
    {
        id: "oeb",
        parent: "oe",
        name: "Other employee benefits",
        value: 333931
    },
    {
        id: "sm",
        parent: "oe",
        name: "Supplies and materials",
        value: 151269
    },
    {
        id: "da",
        parent: "oe",
        name: "Depreciation and amortization",
        value: 235160
    },
    {
        id: "sf",
        parent: "oe",
        name: "Scholarships and fellowships",
        value: 185427
    },
    {
        id: "ut",
        parent: "oe",
        name: "Utilities",
        value: 36364
    },
    {
        id: "ooe",
        parent: "oe",
        name: "Other operating expenses",
        value: 461923
    },
    {
        id: "fd",
        parent: "bk",
        name: "Foundation",
        fill: "#4a5b69"
    },
    {
        id: "flb",
        parent: "fd",
        name: "Liabilities",
        value: 85409
    },
    {
        id: "fclb",
        parent: "flb",
        name: "Current Liabilities",
        value: 10731
    },
    {
        id: "fnclb",
        parent: "flb",
        name: "Noncurrent Liabilities",
        value: 74678
    },
    {
        id: "for",
        parent: "fd",
        name: "Operating Revenues",
        value: 205477
    },
    {
        id: "foe",
        parent: "fd",
        name: "Operating Expenses",
        value: 257186
    },
    {
        id: "fap",
        parent: "fclb",
        name: "Accounts payable",
        value: 1201
    },
    {
        id: "ffhfo",
        parent: "fclb",
        name: "Funds held for others",
        value: 2017
    },
    {
        id: "foclb",
        parent: "fclb",
        name: "Other current liabilities",
        value: 7513
    },
    {
        id: "cfpg",
        parent: "for",
        name: "Campus foundation private gifts",
        value: 205406
    },
    {
        id: "foor",
        parent: "for",
        name: "Other operating revenues",
        value: 71
    },
    {
        id: "cfg",
        parent: "foe",
        name: "Campus foundation grants",
        value: 247667
    },
    {
        id: "fooe",
        parent: "foe",
        name: "Other operating expenses",
        value: 9519
    }
];

export const loadMockData = () => {
  return (dispatch: AppDispatch) => {
    dispatch(loadCampusStart()); // Start loading

    // Simulate an API call with a delay
    setTimeout(() => {
      try {
        // Simulate successful data load
        dispatch(loadCampusSuccess(mockCampus));
      } catch (error) {
        // Simulate error loading data
        dispatch(loadCampusFailure('Failed to load campus.'));
      }
    }, 0); // 2 seconds delay
  };
};
