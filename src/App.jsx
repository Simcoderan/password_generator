import { useCallback, useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  // memory optimization ko laagi useCallback use gareko
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, charAllowed, numberAllowed, setPassword]);

  //useCallback - method re-run vaxa bhane teslaai optimization ko laagi
  //useEffect - dependencies maa kei xedxad vaxa bhane feri change garnalaai
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(Password);
  }, [Password]);

  return (
    <div className="w-full max-w-md mx-auto shadow-lg rounded-lg px-6 py-5 my-10 bg-gray-900 text-orange-400">
      <h1 className="text-white text-center text-3xl font-bold mb-6">
        Password Generator
      </h1>
      <div className="flex shadow-inner rounded-lg overflow-hidden mb-6">
        <input
          type="text"
          value={Password}
          className="outline-none w-full py-3 px-4 bg-gray-700 text-white placeholder-gray-500"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-600 text-white px-4 py-2 text-lg font-semibold"
        >
          Copy
        </button>
      </div>

      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-2">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer w-full"
            onChange={(e) => {
              setLength(e.target.value);
            }}
            name=""
            id=""
          />
          <label className="text-lg">Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            name=""
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
            className="h-6 w-6 cursor-pointer"
          />
          <label htmlFor="numberInput" className="text-lg">
            Numbers
          </label>
        </div>

        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            name=""
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
            className="h-6 w-6 cursor-pointer"
          />
          <label htmlFor="characterInput" className="text-lg">
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
