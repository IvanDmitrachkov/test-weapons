import { useMemo } from "react";
import shuffle from "./shuffle";
import { tickets } from "./questions/tickets";
import { data } from "./questions/data-formatted";
import { QuestionsList } from "../types";

function useList() {
  return useMemo(() => {
    let params = new URLSearchParams(document.location.search);
    const ticket = params.get("ticket");

    let list: QuestionsList = [];
    const count = params.get("count");

    if (ticket) {
      list = shuffle(tickets[+ticket].items);
    } else if (count) {
      list = shuffle(data).slice(0, +count);
    } else {
      list = shuffle(data);
    }

    return list.map((item) => ({
      ...item,
      items: shuffle(item.items),
    }));
  }, []);
}

export default useList;
