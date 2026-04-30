export type Country = {
  name: string;
  code: string;
  dial_code: string;
  flag: string;
};

const dialCodeMap: Record<string, string> = {
  IN: "+91",
  US: "+1",
  CA: "+1",
  GB: "+44",
  AU: "+61",
  DE: "+49",
  FR: "+33",
  JP: "+81",
  CN: "+86",
  BR: "+55",
  ZA: "+27",
  RU: "+7",
  AE: "+971",
  SG: "+65",
  SA: "+966",
  // add more as needed (core ones)
};

const getFlag = (code: string): string =>
  code
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );

export const countries: Country[] = (() => {
  const regionNames = new Intl.DisplayNames(["en"], {
    type: "region",
  });

  const codes = [
    "AF","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","AU","AT","AZ",
    "BS","BH","BD","BB","BY","BE","BZ","BJ","BM","BT","BO","BA","BW","BR","BN",
    "BG","BF","BI","KH","CM","CA","CV","KY","CF","TD","CL","CN","CO","KM","CG",
    "CR","HR","CU","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","EE","ET","FJ",
    "FI","FR","GA","GM","GE","DE","GH","GR","GD","GT","GN","GY","HT","HN","HK",
    "HU","IS","IN","ID","IR","IQ","IE","IL","IT","JM","JP","JO","KZ","KE","KI",
    "KW","KG","LA","LV","LB","LS","LR","LY","LT","LU","MG","MW","MY","MV","ML",
    "MT","MH","MR","MU","MX","FM","MD","MC","MN","ME","MA","MZ","MM","NA","NR",
    "NP","NL","NZ","NI","NE","NG","KP","NO","OM","PK","PW","PA","PG","PY","PE",
    "PH","PL","PT","QA","RO","RU","RW","KN","LC","VC","WS","SM","ST","SA","SN",
    "RS","SC","SL","SG","SK","SI","SB","SO","ZA","KR","ES","LK","SD","SR","SE",
    "CH","SY","TW","TJ","TZ","TH","TL","TG","TO","TT","TN","TR","TM","UG","UA",
    "AE","GB","US","UY","UZ","VU","VA","VE","VN","YE","ZM","ZW"
  ];

  return codes.map((code) => ({
    code,
    name: regionNames.of(code) || code,
    dial_code: dialCodeMap[code] || "",
    flag: getFlag(code),
  }));
})();