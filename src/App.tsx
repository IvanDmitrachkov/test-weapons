import React, { useState } from "react";
import "./App.css";
import useList from "./utils/use-list";

function App() {
  const list = useList();

  const [step, setStep] = useState<number>(0);
  const [errors, setErrors] = useState<
    Record<string, { title: string; value: string }>
  >({});

  const [clicked, setClicked] = useState<undefined | string>();

  if (!list[step]) {
    return (
      <div className="final">
        <h2>Все, вы решили</h2>
        <div>
          <div>Ошибки ({Object.keys(errors).length})</div>
          <ul>
            {Object.values(errors).map(({ title, value }) => (
              <li key={title}>
                <h3>{title}</h3>
                {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  const { title, items } = list[step];

  return (
    <div className="App">
      <div className="counter">
        Вопрос {step + 1} из {list.length}
      </div>
      <div className="title">{title}</div>
      <div>
        {items.map((item) => {
          const className =
            clicked === item.title ? (item.isRight ? "green" : "red") : "";

          return (
            <div
              className={"item " + className}
              key={item.title}
              onClick={() => {
                setClicked(item.title);

                setTimeout(() => {
                  if (item.isRight) {
                    setStep(step + 1);
                  } else {
                    setErrors((item) => ({
                      ...item,
                      [title]: {
                        title,
                        value: items.find((item) => item.isRight)?.title ?? "",
                      },
                    }));
                  }
                  setClicked(undefined);
                }, 1000);
              }}
            >
              {item.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
