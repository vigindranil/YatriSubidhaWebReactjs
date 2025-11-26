module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/mock-booking/data.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ...existing code...
__turbopack_context__.s([
    "bookings",
    ()=>bookings
]);
const bookings = [
    {
        booking_number: "BKG1001",
        customer_name: "Rahul Sen",
        mobile_number: "+91-9876543210",
        passport_number: "E1234567",
        trip: "CityA → CityB",
        slot_date_time: "2025-12-01T09:00:00Z",
        status: "booked",
        payment: {
            method: "UPI",
            amount: 450.0,
            paid_at: "2025-11-20T10:00:00Z",
            transaction_number: "TXN-UTR-1001",
            payment_date: "2025-11-20"
        }
    },
    {
        booking_number: "BKG1002",
        customer_name: "Anita Roy",
        mobile_number: "+91-9123456780",
        passport_number: "P7654321",
        trip: "CityA → CityC",
        slot_date_time: "2025-12-02T14:30:00Z",
        status: "booked",
        payment: {
            method: "Card",
            amount: 600.0,
            paid_at: "2025-11-21T11:30:00Z",
            transaction_number: "TXN-CC-2002",
            payment_date: "2025-11-21"
        },
        checked_by: "operator-ui",
        checked_at: "2025-11-22T09:15:00Z"
    }
] // ...existing code...
;
}),
"[project]/app/api/mock-booking/[bookingNumber]/check/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$mock$2d$booking$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/api/mock-booking/data.ts [app-route] (ecmascript)");
;
;
async function POST(req, context) {
    const params = await context.params;
    const bn = params?.bookingNumber;
    if (!bn) return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]("Missing booking number", {
        status: 400
    });
    const payload = await req.json().catch(()=>({}));
    const operator = payload.operator ?? "unknown";
    const idx = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$mock$2d$booking$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bookings"].findIndex((b)=>b.booking_number === bn);
    if (idx === -1) return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]("Booking not found", {
        status: 404
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$mock$2d$booking$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bookings"][idx].status = "checked";
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$mock$2d$booking$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bookings"][idx].checked_by = operator;
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$mock$2d$booking$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bookings"][idx].checked_at = new Date().toISOString();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$mock$2d$booking$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bookings"][idx]);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__cb965dea._.js.map