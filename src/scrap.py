from flask import Flask, jsonify
import requests

app = Flask(__name__)


@app.route('/papers')
def get_papers():
    search = input("what are you searching for : ")
    url = "https://www.semanticscholar.org/api/1/search"
    headers = {
        "authority": "www.semanticscholar.org",
        "accept": "*/*",
        "accept-language": "en-US,en-AS;q=0.9,en-ZA;q=0.8,en-GB;q=0.7,en;q=0.6,fr;q=0.5",
        "cache-control": "no-cache,no-store,must-revalidate,max-age=-1",
        "content-type": "application/json",
        "origin": "https://www.semanticscholar.org",
        "pragma": "no-cache",
        "referer": "https://www.semanticscholar.org/search",
        "sec-ch-ua": """Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110""",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": """macOS""",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        "x-s2-client": "webapp-browser",
        "x-s2-ui-version": "d4ba3d82e4d31ab6f9dec97f346ea1a0a82584a3"
    }

    postPageLimit = 4

    payloadConstAttrs = {
        "pageSize": postPageLimit,
        "sort": "relevance",
        "authors": [],
        "coAuthors": [],
        "venues": [],
        "yearFilter": None,
        "requireViewablePdf": True,
        "fieldsOfStudy": [],
        "useFallbackRankerService": False,
        "useFallbackSearchCluster": False,
        "hydrateWithDdb": True,
        "includeTldrs": False,
        "performTitleMatch": True,
        "includeBadges": False,
        "tldrModelVersion": "v2.0.0",
        "getQuerySuggestions": False,
        "useS2FosFields": False
    }

    papers = []

    for x in range(1, 3):
        payload = {
            "queryString": str(search),
            "page": x,
            **payloadConstAttrs,
        }

        r = requests.request("POST", url, headers=headers, json=payload)
        data = r.json()
        for r in data["results"]:
            papers.append({
                "id": r["id"],
                "corpusId": r["corpusId"],
                "slug": r["slug"],
                "title": r["title"]["text"],
                "description": r["paperAbstract"]["text"],
                "authors": [
                    {
                        "name": author[0]["name"],
                        "slug": author[0]["slug"],
                        "id": author[0]["ids"][0],
                    } for author in r["authors"]
                ]
            })

    return jsonify(papers)


if __name__ == '__main__':
    app.run()
