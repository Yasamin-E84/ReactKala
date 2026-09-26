import axios from "axios";
import { useEffect, useState } from "react";

const databaseUrl = `${import.meta.env.BASE_URL}db.json`;

function endpointFrom(url) {
  const parsed = new URL(url, window.location.origin);
  const parts = parsed.pathname.split("/").filter(Boolean);

  return {
    key: parts.at(-1),
    params: parsed.searchParams,
  };
}

function withDeploymentAssetPaths(value) {
  if (Array.isArray(value)) return value.map(withDeploymentAssetPaths);

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [
        key,
        withDeploymentAssetPaths(child),
      ]),
    );
  }

  if (typeof value !== "string") return value;
  if (value.startsWith("/images/")) {
    return `${import.meta.env.BASE_URL}${value.slice(1)}`;
  }
  if (value.startsWith("./src/assets/images/")) {
    return `${import.meta.env.BASE_URL}images/${value.slice("./src/assets/images/".length)}`;
  }

  return value;
}

export async function getApiData(url) {
  if (import.meta.env.DEV) {
    const response = await axios.get(url);
    return response.data;
  }

  const response = await axios.get(databaseUrl);
  const { key, params } = endpointFrom(url);
  let data = response.data[key];

  params.forEach((expected, field) => {
    if (Array.isArray(data)) {
      data = data.filter((item) => String(item?.[field]) === expected);
    }
  });

  return withDeploymentAssetPaths(data);
}

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const Fetch = async () => {
      try {
        setData(await getApiData(url));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    Fetch();
  }, [url]);
  return { data, loading, error };
};
export default useFetch;
