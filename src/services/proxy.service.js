class Proxy {
  constructor() {
    this._apiBase = process.env.REACT_APP_API_URL;
  }

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  historyProxy() {
    return this.getResource(`pays/userPay`);
  }

  resellProxy(ip) {
    return this.getResource(`base/prolong?ip=${ip}`);
  }

  buyProxy(id) {
    return this.getResource(`base/buy/${id}`);
  }

  getLand(continent = "asia") {
    return this.getResource(`base/regions?continent=${continent}`);
  }

  getContinent(
    continent,
    socks_type_id = "all",
    blacklisted_search = "all",
    city = "all",
    zip_city = "all",
    region = "all"
  ) {
    return this.getResource(
      `base/search?continent=${continent}&socks_type_id=${socks_type_id}&blacklisted_search=${blacklisted_search}&real_ip=all&domain=all&city=${city}&zip_city=${zip_city}&region=${region}`
    );
  }
}

export default Proxy;
