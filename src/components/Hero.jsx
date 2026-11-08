import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">

      <h1>Learn VLSI from the Basics</h1>

      <p>
        Master Verilog, VHDL, SystemVerilog and EDA tools
        through interactive learning.
      </p>

      <div className="hero-buttons">

        <Link
          to="/verilog"
          className="hero-button"
        >
          Start Learning
        </Link>

        <Link
          to="/eda-playground"
          className="hero-button eda-button"
        >
          EDA Playground
        </Link>

      </div>

    </section>
  );
}

export default Hero;