import json
import math

class CurrencyExchange:
    def __init__(self, rates):
        self.rates = rates

    def pruneGraphGeneral(rates, threshold=0.01):
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

        prunedRates = [
            (src, dest, rate)
            for src in graph
            for dest, rate in graph[src]
        ]

        return prunedRates, allCurrencies
    
    def prunedDijkstraWithProportionalFee(rates, source, destination, threshold=0.01, feePerUnit=0.00003):
        prunedRates, allCurrencies = pruneGraphGeneral(rates, threshold)

        logRates = [(src, dest, -math.log(val * (1 - feePerUnit))) for src, dest, val in prunedRates]

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

        if distances[destination] == float('inf'):
            return json.dumps({"optimal_rate": None, "optimal_path": {}})

        rate = math.exp(-distances[destination])

        medium_currencies = path[1:-1] if len(path) > 2 else []

        result = {
            "optimal_rate": rate,
            "optimal_path": {
                "starting_currency": source,
                "dest_currency": destination,
                "medium_currencies": medium_currencies
            }
        }
        
        return json.dumps(result)