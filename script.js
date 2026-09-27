/* =========================================================
   Computer Store Network
   Graph Theory + Weighted Graph + Tree
   ========================================================= */


/* =========================================================
   GRAPH DATA
   ========================================================= */

const graph = {
    Order: ["Store"],

    Store: [
        "CPU",
        "Motherboard",
        "GPU",
        "RAM",
        "Mouse",
        "Keyboard",
        "Speaker",
        "Headset",
        "USB"
    ],

    CPU: ["Motherboard"],

    Motherboard: ["Transport"],

    GPU: ["Transport"],

    RAM: ["Transport"],

    Mouse: ["Transport"],

    Keyboard: ["Transport"],

    Speaker: ["Transport"],

    Headset: ["Transport"],

    USB: ["Transport"],

    Transport: ["Customer"],

    Customer: []
};


/* =========================================================
   PRODUCT DATA
   ========================================================= */

const products = {

    CPU: {
        name: "CPU",
        processingTime: 2,
        price: 4500
    },

    Motherboard: {
        name: "Motherboard",
        processingTime: 3,
        price: 3200
    },

    GPU: {
        name: "GPU",
        processingTime: 2,
        price: 8500
    },

    RAM: {
        name: "RAM",
        processingTime: 1,
        price: 1800
    },

    Mouse: {
        name: "Mouse",
        processingTime: 1,
        price: 650
    },

    Keyboard: {
        name: "Keyboard",
        processingTime: 1,
        price: 900
    },

    Speaker: {
        name: "Speaker",
        processingTime: 2,
        price: 1200
    },

    Headset: {
        name: "Headset",
        processingTime: 1,
        price: 1500
    },

    USB: {
        name: "USB",
        processingTime: 1,
        price: 350
    }

};


/* =========================================================
   TRANSPORT TIME
   ========================================================= */

const transportTime = {

    Express: 4,

    Standard: 8,

    Economy: 12

};


/* =========================================================
   PROVINCE TIME
   ข้อมูลสมมุติสำหรับโครงงาน
   ========================================================= */

const provinceTime = {

    Bangkok: 1,

    Nonthaburi: 1,

    PathumThani: 1,

    SamutPrakan: 1,

    NakhonPathom: 2,

    SamutSakhon: 2,

    SamutSongkhram: 2,

    Ayutthaya: 2,

    AngThong: 3,

    Lopburi: 3,

    SingBuri: 3,

    ChaiNat: 4,

    Saraburi: 3,

    SuphanBuri: 3,

    Kanchanaburi: 4,

    Ratchaburi: 3,

    Phetchaburi: 4,

    PrachuapKhiriKhan: 6

};


/* =========================================================
   PROVINCE NAME
   ========================================================= */

const provinceName = {

    Bangkok: "กรุงเทพมหานคร",

    Nonthaburi: "นนทบุรี",

    PathumThani: "ปทุมธานี",

    SamutPrakan: "สมุทรปราการ",

    NakhonPathom: "นครปฐม",

    SamutSakhon: "สมุทรสาคร",

    SamutSongkhram: "สมุทรสงคราม",

    Ayutthaya: "พระนครศรีอยุธยา",

    AngThong: "อ่างทอง",

    Lopburi: "ลพบุรี",

    SingBuri: "สิงห์บุรี",

    ChaiNat: "ชัยนาท",

    Saraburi: "สระบุรี",

    SuphanBuri: "สุพรรณบุรี",

    Kanchanaburi: "กาญจนบุรี",

    Ratchaburi: "ราชบุรี",

    Phetchaburi: "เพชรบุรี",

    PrachuapKhiriKhan: "ประจวบคีรีขันธ์"

};


/* =========================================================
   WEIGHTED GRAPH
   ========================================================= */

const weightedEdges = [

    // ร้านค้า → ผู้ส่งสินค้า
    ["Store", "Delivery", 3],

    // ผู้ส่งสินค้า → จังหวัด
    ["Delivery", "ChiangMai", 8],
    ["Delivery", "KhonKaen", 7],
    ["Delivery", "Chonburi", 6],

    // ร้านค้า → จังหวัด
    ["Store", "Bangkok", 2],
    ["Store", "Nonthaburi", 4],

    // จังหวัดเชื่อมต่อกัน
    ["Nonthaburi", "Ayutthaya", 5],
    ["Nonthaburi", "NakhonPathom", 4],

    ["Bangkok", "SamutPrakan", 3],
    ["Bangkok", "Ratchaburi", 7]

];


/* =========================================================
   TREE
   ========================================================= */

const tree = {

    name: "ร้านค้า",

    children: [

        {
            name: "อุปกรณ์ภายในคอมพิวเตอร์",

            children: [

                {
                    name: "CPU"
                },

                {
                    name: "Motherboard"
                },

                {
                    name: "GPU"
                },

                {
                    name: "RAM"
                }

            ]
        },


        {
            name: "อุปกรณ์ภายนอกคอมพิวเตอร์",

            children: [

                {
                    name: "Mouse"
                },

                {
                    name: "Keyboard"
                },

                {
                    name: "Speaker"
                },

                {
                    name: "Headset"
                },

                {
                    name: "USB"
                }

            ]
        }

    ]

};


/* =========================================================
   COMMON FUNCTIONS
   ========================================================= */

function nodes() {

    return Object.keys(graph);

}


function fillSelect(id, data = nodes()) {

    const select =
        document.getElementById(id);

    if (!select) return;

    select.innerHTML = "";

    data.forEach(function (node) {

        const option =
            document.createElement("option");

        option.value = node;

        option.textContent = node;

        select.appendChild(option);

    });

}


/* =========================================================
   BFS
   ========================================================= */

function bfs(start, end) {

    if (!graph[start] || !graph[end]) {

        return [];

    }

    const queue = [
        [start]
    ];

    const visited =
        new Set([start]);


    while (queue.length > 0) {

        const path =
            queue.shift();

        const current =
            path[path.length - 1];


        if (current === end) {

            return path;

        }


        (graph[current] || [])
            .forEach(function (next) {

                if (!visited.has(next)) {

                    visited.add(next);

                    queue.push([
                        ...path,
                        next
                    ]);

                }

            });

    }


    return [];

}


/* =========================================================
   DFS
   ========================================================= */

function dfs(start, end) {

    if (!graph[start] || !graph[end]) {

        return [];

    }


    const visited =
        new Set();


    function search(current, path) {

        if (current === end) {

            return path;

        }


        visited.add(current);


        for (
            const next of graph[current] || []
        ) {

            if (!visited.has(next)) {

                const result =
                    search(
                        next,
                        [...path, next]
                    );

                if (result) {

                    return result;

                }

            }

        }


        return null;

    }


    return search(
        start,
        [start]
    ) || [];

}


/* =========================================================
   GRAPH SEARCH BUTTON
   ========================================================= */

function runGraphSearch(type) {

    const startElement =
        document.getElementById("graphStart");

    const endElement =
        document.getElementById("graphEnd");

    const resultElement =
        document.getElementById("graphResult");


    if (
        !startElement ||
        !endElement ||
        !resultElement
    ) {

        return;

    }


    const start =
        startElement.value;

    const end =
        endElement.value;


    const path =
        type === "bfs"
            ? bfs(start, end)
            : dfs(start, end);


    if (path.length) {

        resultElement.innerHTML = `

            <strong>
                ${type.toUpperCase()}
            </strong>

            <br>

            ${path.join(" → ")}

        `;

    } else {

        resultElement.innerHTML =
            "ไม่พบเส้นทาง";

    }

}


/* =========================================================
   WEIGHTED GRAPH NODES
   ========================================================= */

function weightedNodes() {

    const result =
        new Set();


    weightedEdges.forEach(
        function ([a, b]) {

            result.add(a);

            result.add(b);

        }
    );


    return [...result];

}


/* =========================================================
   DIJKSTRA
   ========================================================= */

function dijkstra(start, end) {

    const allNodes =
        weightedNodes();


    if (
        !allNodes.includes(start) ||
        !allNodes.includes(end)
    ) {

        return null;

    }


    const distance = {};

    const previous = {};

    const visited =
        new Set();


    allNodes.forEach(function (node) {

        distance[node] =
            Infinity;

    });


    distance[start] = 0;


    while (
        visited.size <
        allNodes.length
    ) {

        let current = null;


        allNodes.forEach(function (node) {

            if (
                !visited.has(node) &&
                (
                    current === null ||
                    distance[node] <
                    distance[current]
                )
            ) {

                current = node;

            }

        });


        if (
            current === null ||
            distance[current] === Infinity
        ) {

            break;

        }


        visited.add(current);


        weightedEdges.forEach(
            function ([a, b, weight]) {

                let next = null;


                if (a === current) {

                    next = b;

                }


                if (b === current) {

                    next = a;

                }


                if (next !== null) {

                    const newDistance =
                        distance[current] +
                        weight;


                    if (
                        newDistance <
                        distance[next]
                    ) {

                        distance[next] =
                            newDistance;

                        previous[next] =
                            current;

                    }

                }

            }
        );

    }


    if (
        distance[end] === Infinity
    ) {

        return null;

    }


    const path = [];

    let current = end;


    while (current !== undefined) {

        path.unshift(current);


        if (current === start) {

            break;

        }


        current =
            previous[current];

    }


    if (path[0] !== start) {

        return null;

    }


    return {

        path: path,

        distance: distance[end]

    };

}


/* =========================================================
   RUN DIJKSTRA
   ========================================================= */

function runShortestPath() {

    const startElement =
        document.getElementById("weightStart");

    const endElement =
        document.getElementById("weightEnd");

    const resultElement =
        document.getElementById("weightResult");


    if (
        !startElement ||
        !endElement ||
        !resultElement
    ) {

        return;

    }


    const result =
        dijkstra(
            startElement.value,
            endElement.value
        );


    if (result) {

        resultElement.innerHTML = `

            <strong>
                เส้นทางที่คำนวณได้
            </strong>

            <br>

            ${result.path.join(" → ")}

            <br>

            <strong>
                น้ำหนักรวม:
                ${result.distance}
                units
            </strong>

        `;

    } else {

        resultElement.innerHTML =
            "ไม่พบเส้นทาง";

    }

}


/* =========================================================
   TREE RENDER
   ========================================================= */

function renderTree(node, depth = 0) {

    const div =
        document.createElement("div");


    div.className =
        "tree-node" +
        (
            depth === 0
                ? " root"
                : ""
        );


    div.textContent =
        node.name;


    if (
        node.children &&
        node.children.length > 0
    ) {

        const wrap =
            document.createElement("div");

        wrap.className =
            "tree-level";


        node.children.forEach(
            function (child) {

                wrap.appendChild(
                    renderTree(
                        child,
                        depth + 1
                    )
                );

            }
        );


        const outer =
            document.createElement("div");

        outer.style.textAlign =
            "center";


        outer.appendChild(div);

        outer.appendChild(wrap);


        return outer;

    }


    return div;

}


/* =========================================================
   TREE PREORDER
   ========================================================= */

function preorder(
    node,
    result = []
) {

    result.push(node.name);


    (
        node.children || []
    ).forEach(function (child) {

        preorder(
            child,
            result
        );

    });


    return result;

}


/* =========================================================
   TREE BFS
   ========================================================= */

function treeBFS(root) {

    const queue = [root];

    const result = [];


    while (
        queue.length > 0
    ) {

        const current =
            queue.shift();


        result.push(
            current.name
        );


        (
            current.children || []
        ).forEach(function (child) {

            queue.push(child);

        });

    }


    return result;

}


/* =========================================================
   TREE TRAVERSAL BUTTON
   ========================================================= */

function showTreeTraversal(type) {

    const resultElement =
        document.getElementById(
            "treeResult"
        );


    if (!resultElement) return;


    const result =
        type === "preorder"
            ? preorder(tree)
            : treeBFS(tree);


    const title =
        type === "preorder"
            ? "  ตามลำดับก่อน-หลัง"
            : "  หัวข้อใหญ่ก่อนไปหัวข้อย่อย";


    resultElement.innerHTML = `

        <strong>
            ${title}
        </strong>

        <br>

        ${result.join(" → ")}

    `;

}


/* =========================================================
   ORDER PAGE
   ========================================================= */

function initOrderPage() {

    const productList =
        document.getElementById(
            "productList"
        );

    const addProductButton =
        document.getElementById(
            "addProduct"
        );

    const calculateButton =
        document.getElementById(
            "calculateOrder"
        );

    const provinceSelect =
        document.getElementById(
            "provinceSelect"
        );

    const transportSelect =
        document.getElementById(
            "transportSelect"
        );

    const orderResult =
        document.getElementById(
            "orderResult"
        );


    /*
       ถ้าไม่ใช่หน้า Graph
       ให้หยุดตรงนี้
    */

    if (
        !productList ||
        !addProductButton ||
        !calculateButton ||
        !provinceSelect ||
        !transportSelect ||
        !orderResult
    ) {

        return;

    }


    function createProductRow() {

        const row =
            document.createElement("div");


        row.className =
            "product-row";


        row.innerHTML = `

            <label>

                สินค้า

                <select class="product-select">

                    <option value="CPU">
                        CPU
                    </option>

                    <option value="Motherboard">
                        Motherboard
                    </option>

                    <option value="GPU">
                        GPU
                    </option>

                    <option value="RAM">
                        RAM
                    </option>

                    <option value="Mouse">
                        Mouse
                    </option>

                    <option value="Keyboard">
                        Keyboard
                    </option>

                    <option value="Speaker">
                        Speaker
                    </option>

                    <option value="Headset">
                        Headset
                    </option>

                    <option value="USB">
                        USB
                    </option>

                </select>

            </label>


            <label>

                จำนวน

                <input
                    type="number"
                    class="quantity-input"
                    value="1"
                    min="1"
                    max="99"
                >

            </label>


            <button
                type="button"
                class="remove-product"
            >
                ❌
            </button>

        `;


        const removeButton =
            row.querySelector(
                ".remove-product"
            );


        removeButton.addEventListener(
            "click",
            function () {

                const rows =
                    productList.querySelectorAll(
                        ".product-row"
                    );


                if (
                    rows.length > 1
                ) {

                    row.remove();

                }

            }
        );


        productList.appendChild(row);

    }


    /* สร้างรายการแรก */

    createProductRow();


    /* เพิ่มสินค้า */

    addProductButton.addEventListener(
        "click",
        function () {

            createProductRow();

        }
    );


    /* คำนวณ */

    calculateButton.addEventListener(
        "click",
        function () {

            const rows =
                productList.querySelectorAll(
                    ".product-row"
                );


            const province =
                provinceSelect.value;


            const transport =
                transportSelect.value;


            let totalProductTime = 0;

            let totalQuantity = 0;

            let totalPrice = 0;


            const productDetails = [];


            rows.forEach(
                function (row) {

                    const product =
                        row.querySelector(
                            ".product-select"
                        ).value;


                    const quantity =
                        Number(
                            row.querySelector(
                                ".quantity-input"
                            ).value
                        ) || 1;


                    const productData =
                        products[product];


                    if (!productData) {

                        return;

                    }


                    const time =
                        productData.processingTime *
                        quantity;


                    const price =
                        productData.price *
                        quantity;


                    totalProductTime +=
                        time;


                    totalQuantity +=
                        quantity;


                    totalPrice +=
                        price;


                    productDetails.push({

                        product: product,

                        quantity: quantity,

                        time: time,

                        price: price

                    });

                }
            );


            const storeTime = 1;


            const shippingTime =
                transportTime[transport];


            const destinationTime =
                provinceTime[province];


            const totalTime =
                storeTime +
                totalProductTime +
                shippingTime +
                destinationTime;


            /* =================================================
               ส่งข้อมูลไป Analysis
               ================================================= */

            localStorage.setItem(
                "computerStoreOrder",

                JSON.stringify({

                    products:
                        productDetails,

                    province:
                        province,

                    transport:
                        transport,

                    totalTime:
                        totalTime,

                    totalQuantity:
                        totalQuantity,

                    totalPrice:
                        totalPrice

                })
            );


            /* =================================================
               แสดงผล
               ================================================= */

            let productHTML = "";


            productDetails.forEach(
                function (item) {

                    productHTML += `

                        <li>

                            ${item.product}
                            ×
                            ${item.quantity}

                            =
                            ${item.time}
                            ชั่วโมง

                        </li>

                    `;

                }
            );


            orderResult.innerHTML = `

                <h3>
                    🚚 เส้นทางคำสั่งซื้อ
                </h3>

                <p>

                    Order
                    →
                    Store
                    →
                    Product
                    →
                    Transport
                    →
                    ${provinceName[province]}

                </p>

                <hr>


                <h3>
                    📦 รายการสินค้า
                </h3>

                <ul>

                    ${productHTML}

                </ul>


                <p>
                    🏪 เตรียมคำสั่งซื้อ :
                    ${storeTime}
                    ชั่วโมง
                </p>


                <p>
                    📦 เตรียมสินค้า :
                    ${totalProductTime}
                    ชั่วโมง
                </p>


                <p>
                    🚚 ระบบขนส่ง :
                    ${shippingTime}
                    ชั่วโมง
                </p>


                <p>
                    📍 เดินทางไปจังหวัดปลายทาง :
                    ${destinationTime}
                    ชั่วโมง
                </p>


                <h3>
                    ⏱️ เวลาจัดส่งรวม :
                    ${totalTime}
                    ชั่วโมง
                </h3>


                <h3>
                    💰 มูลค่าสินค้ารวม :
                    ${totalPrice.toLocaleString()}
                    บาท
                </h3>

            `;


            /* =================================================
               Summary
               ================================================= */

            const summaryItems =
                document.getElementById(
                    "summaryItems"
                );

            const summaryQuantity =
                document.getElementById(
                    "summaryQuantity"
                );

            const summaryProvince =
                document.getElementById(
                    "summaryProvince"
                );

            const summaryTransport =
                document.getElementById(
                    "summaryTransport"
                );

            const summaryTime =
                document.getElementById(
                    "summaryTime"
                );

            const summaryStatus =
                document.getElementById(
                    "summaryStatus"
                );


            if (summaryItems) {

                summaryItems.textContent =
                    rows.length +
                    " รายการ";

            }


            if (summaryQuantity) {

                summaryQuantity.textContent =
                    totalQuantity +
                    " ชิ้น";

            }


            if (summaryProvince) {

                summaryProvince.textContent =
                    provinceName[province];

            }


            if (summaryTransport) {

                summaryTransport.textContent =
                    transport;

            }


            if (summaryTime) {

                summaryTime.textContent =
                    totalTime +
                    " ชั่วโมง";

            }


            if (summaryStatus) {

                summaryStatus.textContent =
                    "กำลังจัดส่ง";

            }

        }
    );

}


/* =========================================================
   GRAPH PAGE
   ========================================================= */

function initGraphPage() {

    fillSelect("graphStart");

    fillSelect("graphEnd");


    const map =
        document.getElementById(
            "networkMap"
        );


    if (!map) return;


    map.innerHTML = "";


    nodes().forEach(
        function (node) {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "node";


            div.textContent =
                "📍 " + node;


            map.appendChild(div);

        }
    );

}


/* =========================================================
   ANALYSIS PAGE
   ========================================================= */

function initAnalysisPage() {

    const weightedNodeList =
        weightedNodes();


    fillSelect(
        "weightStart",
        weightedNodeList
    );


    fillSelect(
        "weightEnd",
        weightedNodeList
    );


    const box =
        document.getElementById(
            "weightList"
        );


    if (box) {

        box.innerHTML = "";


        weightedEdges.forEach(
            function ([a, b, weight]) {

                box.innerHTML += `

                    <div class="edge">

                        ${a} ↔ ${b}

                        <br>

                        <strong>
                            ${weight} units
                        </strong>

                    </div>

                `;

            }
        );

    }


    /* รับข้อมูลจาก Graph */

    const savedOrder =
        localStorage.getItem(
            "computerStoreOrder"
        );


    if (!savedOrder) return;


    let orderData;


    try {

        orderData =
            JSON.parse(savedOrder);

    } catch (error) {

        console.error(
            "ไม่สามารถอ่านข้อมูลคำสั่งซื้อ",
            error
        );

        return;

    }


    const orderInfo =
        document.getElementById(
            "orderInfo"
        );


    if (
        orderInfo &&
        orderData
    ) {

        const productText =
            (orderData.products || [])
                .map(
                    function (item) {

                        return (
                            item.product +
                            " × " +
                            item.quantity
                        );

                    }
                )
                .join(", ");


        orderInfo.innerHTML = `

            <p>

                <strong>
                    สินค้า:
                </strong>

                ${productText}

            </p>


            <p>

                <strong>
                    จังหวัด:
                </strong>

                ${
                    provinceName[
                        orderData.province
                    ] ||
                    orderData.province
                }

            </p>


            <p>

                <strong>
                    ขนส่ง:
                </strong>

                ${orderData.transport}

            </p>


            <p>

                <strong>
                    เวลารวม:
                </strong>

                ${orderData.totalTime}
                ชั่วโมง

            </p>


            <p>

                <strong>
                    มูลค่าสินค้า:
                </strong>

                ${
                    (
                        orderData.totalPrice ||
                        0
                    ).toLocaleString()
                }
                บาท

            </p>

        `;

    }

}


/* =========================================================
   TREE PAGE
   ========================================================= */

function initTreePage() {

    const treeView =
        document.getElementById(
            "treeView"
        );


    if (!treeView) return;


    treeView.innerHTML = "";


    treeView.appendChild(
        renderTree(tree)
    );

}


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initOrderPage();

        initGraphPage();

        initAnalysisPage();

        initTreePage();

    }
);