# Plan: RB Motor Rental Payment & Insurance Tracking System

Build a frontend-only application for "RB Motor Rental" to manage motorbike rentals, track payments, and monitor insurance status.

## Scope Summary
- **Brand Identity**: RB Motor Rental.
- **Rental Management**: List and manage motorbikes.
- **Payment Tracking**: Record and view payment history for rentals.
- **Insurance Tracking**: Monitor insurance status and expiration dates for the fleet.
- **Persistence**: Client-side storage only (localStorage).

## Assumptions & Open Questions
- **Assumption**: Since no database is provided, we will use a mock data service with `localStorage` to simulate persistence.
- **Assumption**: The "Track Payment Insurance" request implies tracking whether a bike has insurance and if payments for that insurance are up to date, or general rental payments. I will implement both: rental payment status and bike insurance status.
- **Question**: Are there specific bike models or insurance types? (Plan: I will provide a set of default types but allow customization).

## Affected Areas
- **Frontend**: New dashboard, bike management, and payment tracking components.
- **State Management**: Local storage hooks for persistence.
- **UI Components**: Shadcn UI components (already present in `src/components/ui`).

## Implementation Phases

### Phase 1: Foundation & Data Modeling (frontend_engineer)
- Define TypeScript interfaces for `Motorbike`, `Rental`, `Payment`, and `Insurance`.
- Create a mock data service or custom hooks to handle `localStorage` operations.
- Set up the main layout with navigation (Dashboard, Fleet, Payments).

### Phase 2: Fleet & Insurance Management (frontend_engineer)
- Create a 'Fleet' view to list all motorbikes.
- Implement forms to add/edit bikes, including insurance details (policy number, provider, expiry date).
- Add status indicators for insurance (e.g., Active, Expiring Soon, Expired).

### Phase 3: Rental & Payment Tracking (frontend_engineer)
- Create a 'Rentals' view to manage active rentals.
- Implement a payment recording system linked to specific rentals.
- Build a 'Payments' ledger to view history and total revenue.

### Phase 4: Dashboard & Analytics (quick_fix_engineer)
- Build a summary dashboard showing:
  - Total active rentals.
  - Revenue summary.
  - Alert list for expired or soon-to-expire insurance.
  - Payment collection status.

### Phase 5: Refinement & Branding (quick_fix_engineer)
- Apply "RB Motor Rental" branding throughout the UI.
- Ensure responsive design for mobile use (common for rental shops).
- Final Polish of UI/UX.

## Specialist Ownership
- **frontend_engineer**: Phases 1, 2, and 3 (Core logic and data flow).
- **quick_fix_engineer**: Phases 4 and 5 (UI polish, dashboards, and branding).
