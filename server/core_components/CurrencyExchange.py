import json
import math
import heapq
import sys


class CurrencyExchange:
    def __init__(self, rates):
        self.rates = rates

    def pruneGraphGeneral(self, rates, threshold=0.01):
        graph = {}
        allCurrencies = set()

        for src, dest, rate in rates:
            if rate < threshold:
                continue

            if src not in graph:
                graph[src] = []

            graph[src].append((dest, rate))
            allCurrencies.add(src)
            allCurrencies.add(dest)

        prunedRates = [(src, dest, rate) for src in graph for dest, rate in graph[src]]

        return prunedRates, allCurrencies

    def prunedDijkstraWithProportionalFee(
        self, rates, source, destination, threshold=0.01, feePerUnit=0.00003
    ):
        prunedRates, allCurrencies = self.pruneGraphGeneral(rates, threshold)

        logRates = [
            (src, dest, -math.log(val * (1 - feePerUnit)))
            for src, dest, val in prunedRates
        ]

        distances = {currency: math.inf for currency in allCurrencies}
        distances[source] = 0
        predecessors = {currency: None for currency in allCurrencies}
        heap = [(0, source)]

        while heap:
            currentDist, currentCurrency = heapq.heappop(heap)

            if currentDist > distances[currentCurrency]:
                continue

            for src, dest, logVal in logRates:
                if src == currentCurrency:
                    distance = currentDist + logVal
                    if distance < distances[dest]:
                        distances[dest] = distance
                        predecessors[dest] = src
                        heapq.heappush(heap, (distance, dest))

        path = []
        current = destination
        while current:
            path.append(current)
            current = predecessors[current]
        path.reverse()

        if distances[destination] == float("inf"):
            return json.dumps({"optimal_rate": None, "optimal_path": {}})

        rate = math.exp(-distances[destination])

        # medium_currencies = path[1:-1] if len(path) > 2 else []

        # result = {
        #     "optimal_rate": rate,
        #     "optimal_path": {
        #         "starting_currency": source,
        #         "dest_currency": destination,
        #         "medium_currencies": medium_currencies,
        #     },
        # }
        result = {
            "optimal_rate": rate,
            "optimal_path": path,
        }

        return json.dumps(result)

    # backtracking with pruning and proportional fee
    def prunedBacktrackWithProportionalFee(
        self, rates, source, destination, threshold=0.01, feePerUnit=0.00003
    ):
        prunedRates, allCurrencies = self.pruneGraphGeneral(rates, threshold)
        graph = dict()

        for src, dest, rate in prunedRates:
            if src not in graph:
                graph[src] = []
            graph[src].append((dest, rate))

        i = 0

        def backtrack(current, curRate, visited, path):
            nonlocal i
            if current == destination:
                return curRate, path

            maxRate = 0
            bestPath = []

            for currency, rate in graph.get(current, []):
                if currency not in visited:
                    visited.add(currency)
                    newRate = curRate * rate * (1 - feePerUnit)

                    rate, newPath = backtrack(
                        currency, newRate, visited, path + [currency]
                    )

                    if rate > maxRate:
                        maxRate = rate
                        bestPath = newPath

                    visited.remove(currency)

            return maxRate, bestPath

        rate, path = backtrack(source, 1, set(), [source])
        # result = {
        #     "optimal_rate": rate,
        #     "optimal_path": {
        #         "starting_currency": source,
        #         "dest_currency": destination,
        #         "medium_currencies": path[1:-1],
        #     },
        # }
        result = {
            "optimal_rate": rate,
            "optimal_path": path,
        }

        return json.dumps(result)


if __name__ == "__main__":
    # print(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sep="\n")
    rates, src, dest, fee = (
        json.loads(sys.argv[1]),
        sys.argv[2],
        sys.argv[3],
        float(sys.argv[4]),
    )
    # print(rates, base, quote, fee)

    # format for algo
    formattedRates = [(pair["base"], pair["quote"], pair["rate"]) for pair in rates]
    # print(formattedRates)

    CE = CurrencyExchange(formattedRates)
    sys.stdout.write(
        CE.prunedBacktrackWithProportionalFee(formattedRates, src, dest, feePerUnit=fee)
    )
