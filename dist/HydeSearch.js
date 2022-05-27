var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class HydeSearch {
    constructor(searchIndexLocation) {
        this.searchInput = document.getElementById("search-input");
        this.searchIndexLocation = searchIndexLocation;
    }
    init() {
        console.log("HS/Debug: Initializing...");
        this.loadIndex().then(() => {
            console.log(this.searchIndex);
        });
        this.searchInput.addEventListener("input", () => {
            this.search();
        });
        this.createSearchResultsContainer();
        console.log("HS/Debug: Initialized.");
    }
    loadIndex() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("HS/Debug: Loading index...");
            const response = yield fetch(this.searchIndexLocation, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (!response.ok) {
                throw new Error(`Could not load search index from ${this.searchIndexLocation}`);
            }
            this.searchIndex = yield response.json();
            console.log("HS/Debug: Index loaded.");
        });
    }
    search() {
        console.log("HS/Debug: Searching... Got input: " + this.searchInput.value);
        const searchTerm = this.searchInput.value;
        // Find indexEntries where the search term is in the title or content
        const searchResults = this.searchIndex.filter((indexEntry) => {
            return indexEntry["title"].toLowerCase().includes(searchTerm.toLowerCase())
                || indexEntry["content"].toLowerCase().includes(searchTerm.toLowerCase());
        });
        return searchResults.length > 0
            ? this.displayResults(searchResults)
            : this.displayNoResults();
    }
    displayResults(searchResults) {
        console.log("HS/Debug: Found " + searchResults.length + " search results.");
    }
    displayNoResults() {
        console.log("HS/Debug: No results.");
    }
    createSearchResultsContainer() {
        const searchResultsContainer = document.createElement("div");
        searchResultsContainer.id = "search-results";
        searchResultsContainer.classList.add("hyde-search-results");
        document.getElementById('hyde-search').appendChild(searchResultsContainer);
        const searchResultsList = document.createElement("dl");
        searchResultsContainer.appendChild(searchResultsList);
    }
}
