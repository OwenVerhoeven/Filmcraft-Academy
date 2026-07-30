# ADR 0004: Directed acyclic skill graph

Skills form a directed acyclic graph with AND prerequisites. Branches arise from multiple children, integrations use cross-domain prerequisites, and bosses aggregate chapter/domain mastery. Graph validation rejects cycles, orphans and unreachable required nodes.
