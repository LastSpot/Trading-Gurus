import sys
import os
from pathlib import Path
from dotenv import load_dotenv
import psycopg2
import itertools
import json

server_dir = Path(__file__).parent.parent
module_dir = server_dir.joinpath("core_components").resolve().as_posix()
sys.path.append(module_dir)
from CurrencyExchange import CurrencyExchange

load_dotenv("../server/.env")
latest = os.getenv("latest_table")
with psycopg2.connect(
    dbname=os.getenv("DB"),
    user=os.getenv("GURUS"),
    password=os.getenv("PASSWORD"),
    host=os.getenv("HOST"),
    port=5432,
) as conn:
    with conn.cursor() as cur:
        cur.execute(f"select * from {latest}")
        rates = [(base, quote, rate) for code, base, quote, rate in cur.fetchall()]

        CE = CurrencyExchange(rates)
        currencies = "AUD,CAD,CHF,EUR,GBP,JPY,NZD,USD".split(",")
        pairs = list(itertools.combinations(currencies, 2))
        funcs = [
            CE.prunedBacktrackWithProportionalFee,
            # CE.prunedDijkstraWithProportionalFee,
        ]
        for func in funcs:
            for base, quote in pairs:
                cur.execute(f"select * from {latest} where code = %s", (base + quote,))
                direct = cur.fetchone()
                # print(direct)

                optimal = json.loads(func(rates, base, quote, feePerUnit=0.00000))
                if len(optimal["optimal_path"]) > 2:
                    print("direct :", direct[3], direct[1], direct[2])
                    print(
                        "optimal:",
                        optimal["optimal_rate"],
                        " -> ".join(optimal["optimal_path"]),
                    )
                    print("difference:", optimal["optimal_rate"] - direct[3])
                    print("optimal > direct:", optimal["optimal_rate"] > direct[3])
                    print()
